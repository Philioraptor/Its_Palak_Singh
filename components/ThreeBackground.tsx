"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "1";
    container.appendChild(renderer.domElement);

    // Floating 3D Geometric Meshes (Gold / Amber luxury accents)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // 1. Torus Knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(2.5, 0.45, 100, 16);
    const goldWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, goldWireMaterial);
    torusKnot.position.set(-14, 8, -5);
    objectsGroup.add(torusKnot);

    // 2. Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xe0c06a,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(15, -7, -4);
    objectsGroup.add(icoMesh);

    // 3. Octahedron
    const octaGeo = new THREE.OctahedronGeometry(2, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaMesh.position.set(12, 10, -8);
    objectsGroup.add(octaMesh);

    // Particle Stars / Gold Dust Field
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 55;
      posArray[i + 1] = (Math.random() - 0.5) * 45;
      posArray[i + 2] = (Math.random() - 0.5) * 35;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking for subtle 3D parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Rotate 3D meshes
      torusKnot.rotation.x = elapsed * 0.12;
      torusKnot.rotation.y = elapsed * 0.18;

      icoMesh.rotation.x = -elapsed * 0.1;
      icoMesh.rotation.z = elapsed * 0.14;

      octaMesh.rotation.y = elapsed * 0.2;
      octaMesh.rotation.z = elapsed * 0.15;

      // Particle gentle sway
      particles.rotation.y = elapsed * 0.02 + targetX * 0.2;
      particles.rotation.x = -elapsed * 0.01 + targetY * 0.2;

      // Camera parallax
      camera.position.x = targetX * 2.5;
      camera.position.y = targetY * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      goldWireMaterial.dispose();
      torusKnotGeo.dispose();
      icoMat.dispose();
      icoGeo.dispose();
      octaMat.dispose();
      octaGeo.dispose();
      particleMat.dispose();
      particleGeo.dispose();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
