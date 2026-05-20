"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── Phases ──────────────────────────────────────────────────────────────────
 *  idle  (scroll 0)       DRIFT — glowing copper cloud fills screen, rotates
 *  0.00 → 0.40            DRIFT → EXPLODE
 *  0.40 → 0.75            EXPLODE → CABLE (7-strand helix)
 *  0.75 → 1.00            CABLE holds
 * ─────────────────────────────────────────────────────────────────────────*/

// Vertex: per-particle size + brightness
const VERT = /* glsl */`
  attribute float aSize;
  attribute float aBrightness;
  varying float vBrightness;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (420.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
    vBrightness  = aBrightness;
  }
`;

// Fragment: sphere-normal shading + glow core — works with AdditiveBlending
const FRAG = /* glsl */`
  varying float vBrightness;
  uniform float uOpacity;
  uniform float uPulse;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;

    // Sphere normal
    float zS     = sqrt(max(0.0, 0.25 - d * d)) * 2.0;
    vec3  normal = normalize(vec3(uv * 2.0, zS));

    // Key light  (warm, top-right)
    vec3  keyDir = normalize(vec3(0.5, 0.8, 0.9));
    float diff   = max(0.0, dot(normal, keyDir));

    // Rim light  (cool, back-left)
    vec3  rimDir = normalize(vec3(-0.6, -0.4, -0.5));
    float rim    = max(0.0, dot(normal, rimDir)) * 0.4;

    // Specular
    vec3  halfV  = normalize(keyDir + vec3(0.0, 0.0, 1.0));
    float spec   = pow(max(0.0, dot(normal, halfV)), 48.0);

    // Copper tones
    vec3 base    = vec3(0.95, 0.54, 0.22) * vBrightness * (1.0 + uPulse * 0.18);
    vec3 darkCu  = vec3(0.50, 0.22, 0.08);
    vec3 specCol = vec3(1.0,  0.90, 0.65);

    vec3 color = darkCu * 0.25
               + base   * (0.35 + diff * 0.65 + rim)
               + specCol * spec * 1.1;

    // Glow core: extra brightness at center (AdditiveBlending friendly)
    float glow = pow(max(0.0, 1.0 - d * 2.2), 2.2) * 0.55;
    color += vec3(1.0, 0.70, 0.35) * glow * vBrightness;

    // Radial alpha — fades to black at edges (additive: black = transparent)
    float alpha = smoothstep(0.5, 0.30, d) * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

function eio(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
function lerp(a: number, b: number, t: number) { return a+(b-a)*t; }

// Initial cloud: dramatic sphere that fills the viewport
function sampleDrift(out: Float32Array, i3: number) {
  const r     = 1.2 + Math.random() * 3.4;
  const theta = Math.random() * Math.PI * 2;
  const phi   = Math.acos(2 * Math.random() - 1);
  out[i3]   = r * Math.sin(phi) * Math.cos(theta);
  out[i3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
  out[i3+2] = r * Math.cos(phi) * 0.55;
}

function sampleExplode(out: Float32Array, i3: number) {
  const r     = 3.5 + Math.random() * 5.5;
  const theta = Math.random() * Math.PI * 2;
  const phi   = Math.acos(2 * Math.random() - 1);
  out[i3]   = r * Math.sin(phi) * Math.cos(theta);
  out[i3+1] = r * Math.sin(phi) * Math.sin(theta);
  out[i3+2] = r * Math.cos(phi);
}

function sampleCable(out: Float32Array, i3: number, idx: number, total: number) {
  const STRANDS = 7;
  const s = idx % STRANDS;
  const strandR     = s === 0 ? 0 : 0.30;
  const strandAngle = s === 0 ? 0 : (s - 1) * (Math.PI * 2 / 6);
  const yOff = Math.sin(strandAngle) * strandR;
  const zOff = Math.cos(strandAngle) * strandR;
  const turns = 12;
  const ti = Math.floor(idx / STRANDS) / Math.floor(total / STRANDS) + Math.random() * 0.007;
  const angle = ti * turns * Math.PI * 2 + strandAngle * 2;
  const x = lerp(-3.2, 3.2, ti);
  out[i3]   = x   + Math.cos(angle) * 0.10 * 0.38;
  out[i3+1] = yOff + Math.sin(angle) * 0.10;
  out[i3+2] = zOff + Math.cos(angle + Math.PI) * 0.10 * 0.38;
}

function makeIngotMesh(yOff: number): THREE.Mesh {
  const bW=1.9, bD=0.8, tW=1.55, tD=0.62, bY=-0.28, tY=0.28;
  const v: number[] = [], n: number[] = [];
  const tri = (
    ax:number,ay:number,az:number,
    bx:number,by:number,bz:number,
    cx:number,cy:number,cz:number,
    nx:number,ny:number,nz:number
  ) => {
    v.push(ax,ay,az, bx,by,bz, cx,cy,cz);
    n.push(nx,ny,nz, nx,ny,nz, nx,ny,nz);
  };
  tri(-bW/2,bY,-bD/2, bW/2,bY,-bD/2,  bW/2,bY,bD/2,   0,-1,0);
  tri(-bW/2,bY,-bD/2, bW/2,bY,bD/2,  -bW/2,bY,bD/2,   0,-1,0);
  tri(-tW/2,tY,-tD/2, tW/2,tY,tD/2,   tW/2,tY,-tD/2,  0,1,0);
  tri(-tW/2,tY,-tD/2,-tW/2,tY,tD/2,   tW/2,tY,tD/2,   0,1,0);
  tri(-bW/2,bY,bD/2,  bW/2,bY,bD/2,   tW/2,tY,tD/2,   0,0.15,0.99);
  tri(-bW/2,bY,bD/2,  tW/2,tY,tD/2,  -tW/2,tY,tD/2,   0,0.15,0.99);
  tri( bW/2,bY,-bD/2,-bW/2,bY,-bD/2, -tW/2,tY,-tD/2,  0,0.15,-0.99);
  tri( bW/2,bY,-bD/2,-tW/2,tY,-tD/2,  tW/2,tY,-tD/2,  0,0.15,-0.99);
  tri( bW/2,bY,bD/2,  bW/2,bY,-bD/2,  tW/2,tY,-tD/2,  0.99,0.15,0);
  tri( bW/2,bY,bD/2,  tW/2,tY,-tD/2,  tW/2,tY,tD/2,   0.99,0.15,0);
  tri(-bW/2,bY,-bD/2,-bW/2,bY,bD/2,  -tW/2,tY,tD/2,  -0.99,0.15,0);
  tri(-bW/2,bY,-bD/2,-tW/2,tY,tD/2,  -tW/2,tY,-tD/2, -0.99,0.15,0);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(v), 3));
  geo.setAttribute("normal",   new THREE.BufferAttribute(new Float32Array(n), 3));
  const mat = new THREE.MeshStandardMaterial({ color:0xc07035, metalness:0.97, roughness:0.16 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = yOff;
  return mesh;
}

export function HeroCanvas({ scrollProgress }: { scrollProgress: number }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const scrollRef   = useRef(0);   // shared with animate loop
  const stateRef  = useRef<{
    renderer:   THREE.WebGLRenderer;
    scene:      THREE.Scene;
    camera:     THREE.PerspectiveCamera;
    particles:  THREE.Points;
    ingotGroup: THREE.Group;
    posDrift:   Float32Array;
    posExplode: Float32Array;
    posCable:   Float32Array;
    posCur:     Float32Array;
    pLight:     THREE.PointLight;
    frameId:    number;
    clock:      THREE.Clock;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= 640;
    const NP       = isMobile ? 900 : 2200;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 58 : 46,
      canvas.clientWidth / canvas.clientHeight,
      0.1, 120
    );
    camera.position.set(0, 0, isMobile ? 8.5 : 7.0);

    // Lights
    scene.add(new THREE.AmbientLight(0x1a0800, 1.4));
    const key = new THREE.DirectionalLight(0xffdd99, 5.5);
    key.position.set(3, 5, 3); scene.add(key);
    const fill = new THREE.DirectionalLight(0x223366, 0.6);
    fill.position.set(-4, 0, 2); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xff5510, 2.5);
    rim.position.set(-1, -3, -4); scene.add(rim);
    const pLight = new THREE.PointLight(0xff7030, 6, 16);
    pLight.position.set(0, 2, 4); scene.add(pLight);
    const pl2 = new THREE.PointLight(0xc84010, 3, 18);
    pl2.position.set(-3, -2, 3); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xffaa30, 2.5, 12);
    pl3.position.set(2, -1, 2); scene.add(pl3);

    // Ingot group (centered)
    const ingotGroup = new THREE.Group();
    ingotGroup.add(makeIngotMesh( 0.30));
    ingotGroup.add(makeIngotMesh(-0.38));
    ingotGroup.add(makeIngotMesh(-1.42));
    ingotGroup.visible = false; // hidden until cable phase
    scene.add(ingotGroup);

    // Particle positions
    const posDrift   = new Float32Array(NP * 3);
    const posExplode = new Float32Array(NP * 3);
    const posCable   = new Float32Array(NP * 3);
    const posCur     = new Float32Array(NP * 3);

    for (let i = 0; i < NP; i++) {
      sampleDrift  (posDrift,   i * 3);
      sampleExplode(posExplode, i * 3);
      sampleCable  (posCable,   i * 3, i, NP);
    }
    posDrift.forEach((v, i) => (posCur[i] = v));

    // Per-particle size & brightness
    const sizes = new Float32Array(NP);
    const brts  = new Float32Array(NP);
    for (let i = 0; i < NP; i++) {
      // Varied sizes — large range creates strong depth illusion
      sizes[i] = isMobile
        ? 0.09 + Math.random() * 0.14
        : 0.12 + Math.random() * 0.22;
      brts[i]  = 0.50 + Math.random() * 0.50;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position",    new THREE.BufferAttribute(posCur.slice(), 3));
    geo.setAttribute("aSize",       new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aBrightness", new THREE.BufferAttribute(brts,  1));

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      uniforms: {
        uOpacity: { value: 1.0 },
        uPulse:   { value: 0.0 },
      },
      transparent: true,
      blending:    THREE.AdditiveBlending,  // particles GLOW and stack
      depthWrite:  false,
      depthTest:   false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const p = scrollRef.current;

      // Pulse + light
      mat.uniforms.uPulse.value = Math.sin(t * 1.4) * 0.5 + 0.5;
      pLight.intensity = 6 + Math.sin(t * 1.7) * 1.8;

      // Cloud rotation runs every frame (not just on scroll)
      if (p < 0.40) {
        particles.rotation.y = t * 0.08;
        particles.rotation.x = Math.sin(t * 0.055) * 0.10;
      }

      renderer.render(scene, camera);
    };
    animate();

    stateRef.current = {
      renderer, scene, camera, particles, ingotGroup,
      posDrift, posExplode, posCable, posCur,
      pLight, frameId, clock,
    };

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    const { particles, ingotGroup, posDrift, posExplode, posCable, posCur } = s;
    const NP = posDrift.length / 3;
    const p  = scrollProgress;
    scrollRef.current = p;   // sync to animate loop

    let posA: Float32Array, posB: Float32Array, phaseT: number;

    if (p < 0.40) {
      posA = posDrift; posB = posExplode; phaseT = p / 0.40;
      ingotGroup.visible = false;
      (particles.material as THREE.ShaderMaterial).uniforms.uOpacity.value = 1.0;
    } else if (p < 0.75) {
      const t = (p - 0.40) / (0.75 - 0.40);
      posA = posExplode; posB = posCable; phaseT = t;
      ingotGroup.visible = false;
      particles.rotation.set(0, 0, 0);
      (particles.material as THREE.ShaderMaterial).uniforms.uOpacity.value = 1;
    } else {
      posA = posCable; posB = posCable; phaseT = 1;
      ingotGroup.visible = true;
      const reveal = (p - 0.75) / 0.25;
      ingotGroup.position.x = lerp(3.5, 2.2, eio(Math.min(reveal, 1)));
      ingotGroup.rotation.y = lerp(-0.4, 0.1, eio(Math.min(reveal, 1)));
      particles.rotation.set(0, 0, 0);
      (particles.material as THREE.ShaderMaterial).uniforms.uOpacity.value = 1;
    }

    const et = eio(Math.min(phaseT, 1));
    for (let i = 0; i < NP * 3; i++) {
      posCur[i] = posA[i] + (posB[i] - posA[i]) * et;
    }
    const attr = particles.geometry.getAttribute("position") as THREE.BufferAttribute;
    attr.array.set(posCur);
    attr.needsUpdate = true;
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
