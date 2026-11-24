'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { run, prefersReducedMotion, isTouchDevice } from '@/lib/run-store';

/**
 * Fixed full-screen WebGL background.
 * - Synthwave grid "road" through desert dunes that scrolls forward: scrolling = running.
 * - Neon moon on the horizon (3AM start).
 * - Floating wireframe shapes with mouse parallax.
 * - Speed streaks whose length depends on scroll velocity; they turn into
 *   hyperspace when the skills section is in view (run.warp).
 */
export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = prefersReducedMotion();
    const lowPower = isTouchDevice() || window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // no WebGL: CSS background stays visible
    }
    let pixelRatio = Math.min(window.devicePixelRatio, lowPower ? 0.85 : 1);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x07070b, 30, 120);

    const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 2.4, 8);

    /* ---------------- Grid floor + dunes ---------------- */
    const floorGeo = new THREE.PlaneGeometry(120, 160, lowPower ? 50 : 80, lowPower ? 70 : 110);
    floorGeo.rotateX(-Math.PI / 2);
    floorGeo.translate(0, 0, -60);

    const floorMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uOffset: { value: 0 },
        uOpacity: { value: 1 },
        uColorA: { value: new THREE.Color(0x38bdf8) },
        uColorB: { value: new THREE.Color(0xf472b6) },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        uniform float uOffset;
        varying vec2 vGrid;
        varying float vDist;
        varying float vHeight;
        float terrain(vec2 p) {
          float side = smoothstep(3.5, 16.0, abs(p.x));
          float n = sin(p.x * 0.32 + p.y * 0.13) * cos(p.y * 0.21 - p.x * 0.17)
                  + 0.5 * sin(p.y * 0.41 + p.x * 0.53)
                  + 0.25 * sin(p.x * 1.1 - p.y * 0.7);
          return side * (n * 1.4 + 1.6) * (abs(p.x) * 0.16);
        }
        void main() {
          vec3 p = position;
          vec2 g = vec2(p.x, p.z - uOffset);
          float h = terrain(g);
          p.y += h;
          vGrid = g;
          vHeight = h;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vDist = -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uTime;
        varying vec2 vGrid;
        varying float vDist;
        varying float vHeight;
        void main() {
          vec2 coord = vGrid / 2.0;
          vec2 g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
          float line = 1.0 - min(min(g.x, g.y), 1.0);
          float road = 1.0 - smoothstep(2.6, 3.2, abs(vGrid.x));
          vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 6.0, vHeight));
          // centre lane dashes
          float dash = step(0.5, fract(vGrid.y * 0.25)) * (1.0 - smoothstep(0.04, 0.09, abs(vGrid.x)));
          float fade = 1.0 - smoothstep(25.0, 110.0, vDist);
          float a = (line * (0.55 + 0.45 * road) + dash * 0.9) * fade;
          // subtle glow of the ground
          a += 0.035 * fade;
          gl_FragColor = vec4(col * (1.0 + dash), a * uOpacity);
        }
      `,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    scene.add(floor);

    /* ---------------- Moon on the horizon ---------------- */
    const moonMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: false,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 } },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          vec2 c = vUv - 0.5;
          float d = length(c);
          float disc = 1.0 - smoothstep(0.485, 0.5, d);
          vec3 top = vec3(0.98, 0.45, 0.71);
          vec3 bot = vec3(0.22, 0.74, 0.97);
          vec3 col = mix(bot, top, vUv.y);
          // horizontal scan cuts in the lower half
          float y = vUv.y;
          float bands = step(0.5, fract(y * 18.0 - uTime * 0.25));
          float cut = mix(1.0, bands, 1.0 - smoothstep(0.25, 0.55, y));
          float glow = (1.0 - smoothstep(0.3, 0.5, d)) * 0.0 + smoothstep(0.5, 0.2, d) * 0.15;
          float a = disc * cut * 0.85 + glow;
          gl_FragColor = vec4(col, a * uOpacity);
        }
      `,
    });
    const moon = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), moonMat);
    moon.position.set(0, 9, -115);
    scene.add(moon);

    /* ---------------- Floating wireframe shapes ---------------- */
    const shapeMat = (color: number, opacity = 0.4) =>
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, fog: true });

    const shapeDefs: { geo: THREE.BufferGeometry; pos: [number, number, number]; color: number; spin: number }[] = [
      { geo: new THREE.IcosahedronGeometry(2.2, 1), pos: [-9, 6, -18], color: 0x38bdf8, spin: 0.15 },
      { geo: new THREE.TorusKnotGeometry(1.6, 0.42, 90, 10), pos: [10, 7.5, -26], color: 0xf472b6, spin: 0.1 },
      { geo: new THREE.OctahedronGeometry(1.6, 0), pos: [6, 3.5, -10], color: 0x38bdf8, spin: 0.3 },
      { geo: new THREE.TorusGeometry(2.4, 0.08, 8, 48), pos: [-6, 9, -34], color: 0xf59e0b, spin: 0.2 },
      { geo: new THREE.DodecahedronGeometry(1.3, 0), pos: [-13, 3, -40], color: 0xf472b6, spin: 0.25 },
      { geo: new THREE.IcosahedronGeometry(3.2, 0), pos: [16, 12, -55], color: 0x38bdf8, spin: 0.08 },
    ];
    const shapes = shapeDefs.map((d, i) => {
      const m = new THREE.Mesh(d.geo, shapeMat(d.color, 0.32));
      m.position.set(...d.pos);
      m.userData = { base: new THREE.Vector3(...d.pos), spin: d.spin, phase: i * 1.7 };
      scene.add(m);
      return m;
    });

    /* ---------------- Speed streaks / hyperspace ---------------- */
    const STREAKS = lowPower ? 140 : 300;
    const streakPos = new Float32Array(STREAKS * 6);
    const streakData: { x: number; y: number; z: number; s: number }[] = [];
    const spawnStreak = (i: number, randomZ: boolean) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 22;
      const d = {
        x: Math.cos(angle) * radius,
        y: 3 + Math.sin(angle) * radius * 0.6,
        z: randomZ ? -Math.random() * 140 : -140 - Math.random() * 20,
        s: 0.6 + Math.random() * 0.8,
      };
      if (d.y < 0.6) d.y = 0.6 + Math.random() * 2;
      streakData[i] = d;
    };
    for (let i = 0; i < STREAKS; i++) spawnStreak(i, true);
    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPos, 3));
    const streakMat = new THREE.LineBasicMaterial({
      color: 0x9fdcff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const streaks = new THREE.LineSegments(streakGeo, streakMat);
    streaks.frustumCulled = false;
    scene.add(streaks);

    /* ---------------- Loop ---------------- */
    const clock = new THREE.Clock();
    const accent = new THREE.Color(0x38bdf8);
    const tmpColor = new THREE.Color();
    let speed = 0.15;
    let offset = 0;
    let stride = 0;
    let camX = 0;
    let camY = 2.4;
    let raf = 0;
    let visible = true;
    // adaptive quality: if frames run long, render at a lower resolution
    let slowFrames = 0;
    let sampled = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const rawDt = clock.getDelta();
      const dt = Math.min(rawDt, 0.05);
      if (run.booted && pixelRatio > 0.6) {
        sampled++;
        if (rawDt > 0.024) slowFrames++;
        if (sampled >= 90) {
          if (slowFrames > 30) {
            pixelRatio = Math.max(0.6, pixelRatio - 0.2);
            renderer.setPixelRatio(pixelRatio);
          }
          sampled = 0;
          slowFrames = 0;
        }
      }
      const t = clock.elapsedTime;
      const f = dt * 60;

      // speed: idle jog + scroll velocity
      const target = (reduced ? 0.05 : 0.18) + Math.min(Math.abs(run.velocity) * 0.025, 1.6);
      speed += (target - speed) * 0.06 * f;
      run.warp += (run.warpTarget - run.warp) * 0.04 * f;
      const warp = run.warp;
      const hide = Math.min(1, warp * 1.8); // scenery fades out faster than streaks grow

      offset += speed * f * 0.6 * (1 + warp * 2);
      floorMat.uniforms.uOffset.value = offset;
      floorMat.uniforms.uOpacity.value = 1 - hide * 0.8;
      floorMat.uniforms.uTime.value = t;
      moonMat.uniforms.uTime.value = t;
      moonMat.uniforms.uOpacity.value = 1 - hide;

      // accent colour per section
      tmpColor.setHex(run.accent);
      accent.lerp(tmpColor, 0.03 * f);
      floorMat.uniforms.uColorA.value.lerp(accent, 0.02 * f);

      // camera: running bob + mouse parallax
      stride += dt * (5 + speed * 9);
      const bob = reduced ? 0 : Math.abs(Math.sin(stride)) * 0.12 * Math.min(1, speed * 2.5);
      camX += (run.mouseX * 1.6 - camX) * 0.04 * f;
      camY += (2.4 + bob - run.mouseY * 0.7 - camY) * 0.08 * f;
      camera.position.x = camX;
      camera.position.y = camY;
      camera.rotation.z = -camX * 0.015 + Math.sin(stride * 0.5) * 0.003 * speed;
      camera.lookAt(camX * 0.3, 2.2 - run.mouseY * 0.3, -50);
      const fov = 62 + warp * 28 + Math.min(speed, 1.6) * 4;
      if (Math.abs(camera.fov - fov) > 0.01) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      // shapes
      for (const m of shapes) {
        const u = m.userData as { base: THREE.Vector3; spin: number; phase: number };
        m.rotation.x += u.spin * dt * (1 + speed);
        m.rotation.y += u.spin * dt * 1.3 * (1 + speed);
        m.position.x = u.base.x - run.mouseX * 1.2 * (u.base.z / -20);
        m.position.y = u.base.y + Math.sin(t * 0.6 + u.phase) * 0.6 + run.mouseY * 0.6;
        m.position.z = u.base.z + run.progress * 6;
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.32 * (1 - hide * 0.9);
        const s = 1 + warp * 0.4;
        m.scale.setScalar(s);
      }

      // streaks
      const len = 0.15 + speed * 2.2 + warp * 14;
      const vz = (speed * 1.1 + warp * 3.2) * f;
      streakMat.opacity = Math.min(0.9, 0.12 + speed * 0.35 + warp * 0.6);
      for (let i = 0; i < STREAKS; i++) {
        const d = streakData[i];
        d.z += vz * d.s;
        if (d.z > 10) spawnStreak(i, false);
        const o = i * 6;
        streakPos[o] = d.x;
        streakPos[o + 1] = d.y;
        streakPos[o + 2] = d.z;
        streakPos[o + 3] = d.x;
        streakPos[o + 4] = d.y;
        streakPos[o + 5] = d.z - len * d.s;
      }
      streakGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      clock.getDelta();
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 80% 55% at 50% 35%, rgba(244,114,182,0.07) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(56,189,248,0.08) 0%, transparent 60%), #07070b',
      }}
    />
  );
}
