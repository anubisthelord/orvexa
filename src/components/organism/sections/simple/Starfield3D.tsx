"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface Starfield3DProps {
  opacity: MotionValue<number>;
}

export default function Starfield3D({ opacity }: Starfield3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Capped at 1.5 to save GPU memory and prevent scroll stutter on Retina screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); 
    mount.appendChild(renderer.domElement);

    // --- LAYER 1: Dense Background Stars ---
    const bgStarsCount = 8000; 
    const bgGeometry = new THREE.BufferGeometry();
    const bgPositions = new Float32Array(bgStarsCount * 3);
    const bgColors = new Float32Array(bgStarsCount * 3);
    const bgSizes = new Float32Array(bgStarsCount);
    const color = new THREE.Color();

    for (let i = 0; i < bgStarsCount; i++) {
      const radius = 100 + Math.random() * 200; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      bgPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      bgPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      bgPositions[i * 3 + 2] = radius * Math.cos(phi);

      color.setHSL(0.6, 0.2, 0.9); 
      bgColors[i * 3] = color.r;
      bgColors[i * 3 + 1] = color.g;
      bgColors[i * 3 + 2] = color.b;
      bgSizes[i] = Math.random() * 1.5 + 0.8;
    }

    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
    bgGeometry.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));
    bgGeometry.setAttribute('size', new THREE.BufferAttribute(bgSizes, 1));

    // --- LAYER 2: Low Opacity Square Flakes (Tiny) ---
    const debrisCount = 1200; 
    const debrisGeometry = new THREE.BufferGeometry();
    const debrisPositions = new Float32Array(debrisCount * 3);
    const debrisColors = new Float32Array(debrisCount * 3);
    const debrisSizes = new Float32Array(debrisCount);

    for (let i = 0; i < debrisCount; i++) {
      const radius = 15 + Math.random() * 50; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      debrisPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      debrisPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5; 
      debrisPositions[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      if (rand > 0.8) {
        color.setRGB(0.6, 1.0, 0.6); 
      } else if (rand > 0.6) {
        color.setRGB(0.7, 0.7, 0.7); 
      } else {
        color.setRGB(1.0, 1.0, 1.0); 
      }
      
      debrisColors[i * 3] = color.r;
      debrisColors[i * 3 + 1] = color.g;
      debrisColors[i * 3 + 2] = color.b;
      
      const sizeRand = Math.random();
      if (sizeRand > 0.9) {
        debrisSizes[i] = Math.random() * 1.6 + 1.06; 
      } else if (sizeRand > 0.6) {
        debrisSizes[i] = Math.random() * 0.8 + 0.53; 
      } else {
        debrisSizes[i] = Math.random() * 0.4 + 0.26; 
      }
    }

    debrisGeometry.setAttribute('position', new THREE.BufferAttribute(debrisPositions, 3));
    debrisGeometry.setAttribute('color', new THREE.BufferAttribute(debrisColors, 3));
    debrisGeometry.setAttribute('size', new THREE.BufferAttribute(debrisSizes, 1));

    // --- SHADERS ---
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, pixelRatio: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float twinkle = sin(time * 1.5 + position.x * 5.0) * 0.4 + 0.6;
          gl_PointSize = size * twinkle * pixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord.xy;
          float d = distance(uv, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, d);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const debrisMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, pixelRatio: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * pixelRatio * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord.xy;
          float edgeX = smoothstep(0.0, 0.15, uv.x) - smoothstep(0.85, 1.0, uv.x);
          float edgeY = smoothstep(0.0, 0.15, uv.y) - smoothstep(0.85, 1.0, uv.y);
          float alpha = edgeX * edgeY;
          gl_FragColor = vec4(vColor, alpha * 0.15);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bgStars = new THREE.Points(bgGeometry, starMaterial);
    const planetDebris = new THREE.Points(debrisGeometry, debrisMaterial);
    
    scene.add(bgStars);
    scene.add(planetDebris);

    // 4. Optimized Animation Loop with FPS Throttling
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 60; 
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // THROTTLE: Skip rendering if it's happening too fast (fixes high-refresh rate jank)
      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;
      lastTime = currentTime - (deltaTime % interval);

      const time = currentTime * 0.001;
      
      starMaterial.uniforms.time.value = time;
      
      planetDebris.rotation.z = time * 0.03; 
      planetDebris.rotation.y = time * 0.01;
      
      bgStars.rotation.y = time * 0.01;

      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    // 5. Resize Handling
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        starMaterial.uniforms.pixelRatio.value = renderer.getPixelRatio();
        debrisMaterial.uniforms.pixelRatio.value = renderer.getPixelRatio();
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    // 6. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      bgGeometry.dispose();
      starMaterial.dispose();
      debrisGeometry.dispose();
      debrisMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // 7. Direct DOM styling for opacity (Bypasses React rendering completely)
  const handleMount = (node: HTMLDivElement | null) => {
    mountRef.current = node;
    if (node && opacity) {
      opacity.on("change", (latest) => {
        if (node) node.style.opacity = latest.toString();
      });
    }
  };

  return (
    <div 
      ref={handleMount} 
      className="absolute inset-0 pointer-events-none z-0" 
    />
  );
}