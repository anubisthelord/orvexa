"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface BlackHole3DSceneProps {
  scrollProgress: MotionValue<number>;
  sectionX: MotionValue<string>;
  sectionY: MotionValue<string>;
  finalWrapperScale: MotionValue<number>;
  baseRingScale: MotionValue<number>;
}

export default function BlackHole3DScene({
  sectionX,
  sectionY,
  finalWrapperScale,
  baseRingScale
}: BlackHole3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // Using PerspectiveCamera instead of Orthographic so the video looks natural
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    mount.appendChild(renderer.domElement);

    // 2. The Black Hole Video Setup
    const video = document.createElement('video');
    video.src = '/home-preview/blackhole-loop.webm';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    
    // We calculate the exact height and width of the viewport at z=0
    const vFOV = (camera.fov * Math.PI) / 180; 
    const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const width = height * camera.aspect;

    const videoGeometry = new THREE.PlaneGeometry(width, height);
    const videoMaterial = new THREE.MeshBasicMaterial({ 
      map: videoTexture, 
      transparent: true, 
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    scene.add(videoMesh);

    // 3. The Rings Setup
    const ringsGroup = new THREE.Group();
    
    // We create 9 rings with sizes relative to the screen width
    for (let i = 0; i < 9; i++) {
      // Scales from small to large, matching your original design
      const scaleMultiplier = 1 + (i * 0.4); 
      
      const ringGeo = new THREE.RingGeometry(1, 1.02, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xb6ff7a,
        transparent: true,
        opacity: (1 - i * 0.08) * 0.3, 
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      
      // Store the base scale multiplier in the mesh's userData
      ringMesh.userData.baseScale = scaleMultiplier;
      ringsGroup.add(ringMesh);
    }
    scene.add(ringsGroup);

    // 4. Animation Loop (Lerp)
    let animationFrameId: number;
    let currentX = 0, currentY = 0, currentScale = 1, currentRingScale = 1;
    
    // Helper to convert "22vw" to actual 3D units
    const parseVw = (val: string) => (parseFloat(val) / 100) * width;
    const parseVh = (val: string) => (parseFloat(val) / 100) * height;

    const animate = () => {
      // Get target values from Framer Motion
      const targetX = parseVw(sectionX.get());
      const targetY = -parseVh(sectionY.get()); // Invert Y for 3D space
      const targetScale = finalWrapperScale.get();
      const targetRingScale = baseRingScale.get();

      // Lerp for smooth inertia
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentScale += (targetScale - currentScale) * 0.08;
      currentRingScale += (targetRingScale - currentRingScale) * 0.08;

      // Apply to Video
      videoMesh.position.x = currentX;
      videoMesh.position.y = currentY;
      videoMesh.scale.set(currentScale, currentScale, 1);

      // Apply to Rings
      ringsGroup.position.x = currentX;
      ringsGroup.position.y = currentY;
      
      // Update each ring's scale based on the camera's view size
      ringsGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const baseScale = mesh.userData.baseScale;
        // Adjusting the ring sizes to look good on all screens
        const size = (width / 6) * baseScale * currentRingScale * currentScale;
        mesh.scale.set(size, size, 1);
      });
      
      // Slowly rotate the rings
      ringsGroup.rotation.z += 0.002;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 5. Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      video.pause();
      video.src = '';
      videoTexture.dispose();
      videoGeometry.dispose();
      videoMaterial.dispose();
      ringsGroup.children.forEach((child) => {
        (child as THREE.Mesh).geometry.dispose();
        ((child as THREE.Mesh).material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [sectionX, sectionY, finalWrapperScale, baseRingScale]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10" 
    />
  );
}