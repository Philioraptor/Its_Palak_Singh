"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface BookProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  totalPages: number;
  coverImg: string;
  interiorPages: string[];
  description: string;
}

export const BOOK_PROJECTS: BookProject[] = [
  {
    id: "mental-health-book",
    title: "Mental Health Awareness Among Students",
    subtitle: "Understanding Stress, Anxiety & Emotional Well-being",
    category: "21-Page Editorial Book Publication",
    totalPages: 21,
    coverImg: "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_1.png",
    interiorPages: [
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_1.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_2.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_3.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_4.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_5.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_6.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_7.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_8.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_9.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_10.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_11.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_12.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_13.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_14.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_15.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_16.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_17.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_18.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_19.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_20.png",
      "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_21.png",
    ],
    description: "Complete 21-page institutional research & awareness book layout created by Palak Singh at Frameboxx 2.0. Encompasses conceptual illustration, chapter title typesetting, structured grid typography, and infographic figures.",
  },
  {
    id: "she-healed-herself",
    title: "She Healed Herself",
    subtitle: "Poetry & Emotional Healing Anthology",
    category: "Hardcover Book Design",
    totalPages: 2,
    coverImg: "/book-designs/WhatsApp%20Image%202026-09-21%20at%203.05.19%20PM.jpeg",
    interiorPages: [
      "/book-designs/WhatsApp%20Image%202026-09-21%20at%203.05.19%20PM.jpeg",
    ],
    description: "Heartfelt book jacket and typography cover featuring anatomical heart illustration wrapped with healing gauze, emotive verse typography, and author branding.",
  },
  {
    id: "product-catalog",
    title: "Sony Photography Product Catalog",
    subtitle: "The Art Of Capturing Life",
    category: "Commercial Product Catalog",
    totalPages: 1,
    coverImg: "/book-designs/pdf_pages/CATALOG_PALAK_page_1.png",
    interiorPages: [
      "/book-designs/pdf_pages/CATALOG_PALAK_page_1.png",
    ],
    description: "Multi-grid corporate catalog layout for digital mirrorless cameras and lenses. Geometrical angular cutouts with bold editorial typography.",
  },
  {
    id: "restaurant-menu-card",
    title: "Spicy Food Restaurant Menu",
    subtitle: "Where Flavor Meets Fire",
    category: "Editorial Hospitality Menu",
    totalPages: 1,
    coverImg: "/book-designs/pdf_pages/MENU_CARD_PALAK_page_1.png",
    interiorPages: [
      "/book-designs/pdf_pages/MENU_CARD_PALAK_page_1.png",
    ],
    description: "Full-bleed mouth-watering restaurant menu design with dark slate background, vibrant food photography, category panels, and pricing layout.",
  },
];

interface ThreeBookViewerProps {
  onOpenInModal?: (book: BookProject, pageIndex: number) => void;
}

export default function ThreeBookViewer({ onOpenInModal }: ThreeBookViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const activeBook = BOOK_PROJECTS[selectedBookIndex];

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const bookGroupRef = useRef<THREE.Group | null>(null);
  const coverPivotRef = useRef<THREE.Group | null>(null);
  const coverMeshRef = useRef<THREE.Mesh | null>(null);
  const interiorPageMeshRef = useRef<THREE.Mesh | null>(null);

  // Target rotation for open/close animation
  const targetCoverAngleRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 11);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff3db, 2.2);
    dirLight.position.set(6, 9, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const goldRimLight = new THREE.DirectionalLight(0xc9a84c, 1.6);
    goldRimLight.position.set(-8, -4, -6);
    scene.add(goldRimLight);

    // Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -3.2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Book Group
    const bookGroup = new THREE.Group();
    bookGroupRef.current = bookGroup;
    scene.add(bookGroup);
    bookGroup.position.set(0, 0, 0);
    bookGroup.rotation.set(0.1, -0.4, 0);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Dimensions
    const bookWidth = 4.2;
    const bookHeight = 5.8;
    const bookDepth = 0.55;

    // 1. Pages Block (White paper block with ribbed edges)
    const pagesGeo = new THREE.BoxGeometry(bookWidth * 0.96, bookHeight * 0.96, bookDepth * 0.85);
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xf5eedc,
      roughness: 0.8,
      metalness: 0.05,
    });
    const pagesMesh = new THREE.Mesh(pagesGeo, paperMat);
    pagesMesh.position.set(0, 0, 0);
    pagesMesh.castShadow = true;
    pagesMesh.receiveShadow = true;
    bookGroup.add(pagesMesh);

    // 2. Interior Page Display (Inside the book block)
    const interiorGeo = new THREE.PlaneGeometry(bookWidth * 0.94, bookHeight * 0.94);
    const interiorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
    });
    const interiorMesh = new THREE.Mesh(interiorGeo, interiorMat);
    interiorMesh.position.set(0, 0, bookDepth * 0.43);
    interiorMesh.receiveShadow = true;
    bookGroup.add(interiorMesh);
    interiorPageMeshRef.current = interiorMesh;

    // 3. Back Cover
    const backCoverGeo = new THREE.BoxGeometry(bookWidth, bookHeight, 0.06);
    const coverBackMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.5,
    });
    const backCoverMesh = new THREE.Mesh(backCoverGeo, coverBackMat);
    backCoverMesh.position.set(0, 0, -bookDepth * 0.45);
    backCoverMesh.castShadow = true;
    bookGroup.add(backCoverMesh);

    // 4. Spine
    const spineGeo = new THREE.BoxGeometry(0.1, bookHeight, bookDepth);
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      roughness: 0.3,
      metalness: 0.6,
    });
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    spineMesh.position.set(-bookWidth / 2, 0, 0);
    bookGroup.add(spineMesh);

    // 5. Front Cover with Pivot Hinge (Left side spine pivot)
    const coverPivot = new THREE.Group();
    coverPivot.position.set(-bookWidth / 2, 0, bookDepth * 0.45);
    bookGroup.add(coverPivot);
    coverPivotRef.current = coverPivot;

    const frontCoverGeo = new THREE.BoxGeometry(bookWidth, bookHeight, 0.06);
    frontCoverGeo.translate(bookWidth / 2, 0, 0); // translate so origin is at spine hinge

    // Materials array for front cover box: [right, left(spine), top, bottom, front, back]
    const goldRim = new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.7, roughness: 0.3 });
    const coverInside = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.8 });
    const frontMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.1,
    });

    const coverMaterials = [goldRim, goldRim, goldRim, goldRim, frontMat, coverInside];
    const frontCoverMesh = new THREE.Mesh(frontCoverGeo, coverMaterials);
    frontCoverMesh.castShadow = true;
    coverPivot.add(frontCoverMesh);
    coverMeshRef.current = frontCoverMesh;

    // Function to load textures
    const updateTextures = (coverUrl: string, interiorUrl: string) => {
      textureLoader.load(coverUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        frontMat.map = tex;
        frontMat.needsUpdate = true;
      });
      textureLoader.load(interiorUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        interiorMat.map = tex;
        interiorMat.needsUpdate = true;
      });
    };
    updateTextures(activeBook.coverImg, activeBook.interiorPages[0]);

    // Drag Orbit interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !bookGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      bookGroupRef.current.rotation.y += deltaX * 0.008;
      bookGroupRef.current.rotation.x += deltaY * 0.008;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
    let prevTouchX = 0;
    let prevTouchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !bookGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevTouchX;
      const deltaY = e.touches[0].clientY - prevTouchY;
      prevTouchX = e.touches[0].clientX;
      prevTouchY = e.touches[0].clientY;

      bookGroupRef.current.rotation.y += deltaX * 0.01;
      bookGroupRef.current.rotation.x += deltaY * 0.01;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth cover open/close hinge rotation
      if (coverPivotRef.current) {
        coverPivotRef.current.rotation.y +=
          (targetCoverAngleRef.current - coverPivotRef.current.rotation.y) * 0.08;
      }

      // Auto rotation when enabled and not dragging
      if (autoRotate && !isDragging && bookGroupRef.current) {
        bookGroupRef.current.rotation.y += delta * 0.35;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pagesGeo.dispose();
      paperMat.dispose();
      interiorGeo.dispose();
      interiorMat.dispose();
      backCoverGeo.dispose();
      coverBackMat.dispose();
      spineGeo.dispose();
      spineMat.dispose();
      frontCoverGeo.dispose();
      frontMat.dispose();
      goldRim.dispose();
      coverInside.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, []);

  // Update book selection
  useEffect(() => {
    setCurrentPageIndex(0);
    setIsOpen(false);
    targetCoverAngleRef.current = 0;

    const book = BOOK_PROJECTS[selectedBookIndex];
    if (coverMeshRef.current && interiorPageMeshRef.current) {
      const loader = new THREE.TextureLoader();
      loader.load(book.coverImg, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const mat = (coverMeshRef.current!.material as THREE.Material[])[4] as THREE.MeshStandardMaterial;
        mat.map = tex;
        mat.needsUpdate = true;
      });
      loader.load(book.interiorPages[0], (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const mat = interiorPageMeshRef.current!.material as THREE.MeshStandardMaterial;
        mat.map = tex;
        mat.needsUpdate = true;
      });
    }
  }, [selectedBookIndex]);

  // Handle open/close toggle
  const toggleBookOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    // Hinge angle: -2.7 radians (approx -155 degrees) opens the cover flat
    targetCoverAngleRef.current = nextState ? -Math.PI * 0.88 : 0;
  };

  // Flip page
  const handlePageChange = (index: number) => {
    if (index < 0 || index >= activeBook.interiorPages.length) return;
    setCurrentPageIndex(index);
    if (!isOpen) {
      setIsOpen(true);
      targetCoverAngleRef.current = -Math.PI * 0.88;
    }

    if (interiorPageMeshRef.current) {
      const loader = new THREE.TextureLoader();
      loader.load(activeBook.interiorPages[index], (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const mat = interiorPageMeshRef.current!.material as THREE.MeshStandardMaterial;
        mat.map = tex;
        mat.needsUpdate = true;
      });
    }
  };

  const resetView = () => {
    if (bookGroupRef.current) {
      bookGroupRef.current.rotation.set(0.1, -0.4, 0);
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#121212] via-[#0b0b0b] to-[#070707] p-4 sm:p-8 overflow-hidden shadow-2xl">
      {/* Top Header & Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs font-mono uppercase tracking-widest">
              Interactive 3D Three.js Studio
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
            Real 3D Editorial & Book Viewer
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-1 max-w-xl">
            Drag with your mouse to orbit 360° in 3D space. Click &quot;Open Book&quot; to inspect pages inside.
          </p>
        </div>

        {/* Publication Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {BOOK_PROJECTS.map((book, idx) => (
            <button
              key={book.id}
              onClick={() => setSelectedBookIndex(idx)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap border ${
                selectedBookIndex === idx
                  ? "bg-[#c9a84c] text-black font-bold border-[#c9a84c] shadow-lg shadow-[#c9a84c]/20"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-[#c9a84c]/40 hover:text-white"
              }`}
            >
              {book.id === "mental-health-book" && "📘 "}
              {book.id === "she-healed-herself" && "📕 "}
              {book.id === "product-catalog" && "📸 "}
              {book.id === "restaurant-menu-card" && "🍔 "}
              {book.title.split("—")[0].slice(0, 18)}...
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
        {/* Three.js Canvas */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[480px] md:h-[540px] w-full rounded-xl overflow-hidden bg-radial from-[#1e1e1e]/40 to-transparent flex items-center justify-center">
          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono text-white/70 flex items-center gap-2 pointer-events-none">
            <span>🖱️ Drag to rotate 3D</span>
            <span className="text-white/20">|</span>
            <span className="text-[#c9a84c]">
              {isOpen ? "📖 Book Open" : "📕 Book Closed"}
            </span>
          </div>

          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive Floating Control Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-2xl">
            <button
              onClick={toggleBookOpen}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all uppercase flex items-center gap-1.5 ${
                isOpen
                  ? "bg-white text-black font-bold"
                  : "bg-[#c9a84c] text-black font-bold hover:bg-[#e0c06a]"
              }`}
            >
              {isOpen ? "Close Book ✕" : "Open Book & Flip 📖"}
            </button>

            {activeBook.interiorPages.length > 1 && (
              <div className="flex items-center gap-1 border-x border-white/15 px-2">
                <button
                  disabled={currentPageIndex <= 0}
                  onClick={() => handlePageChange(currentPageIndex - 1)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-xs text-white"
                  title="Previous Page"
                >
                  ←
                </button>
                <span className="text-[11px] font-mono text-white/80 px-1.5">
                  Page {currentPageIndex + 1}/{activeBook.totalPages}
                </span>
                <button
                  disabled={currentPageIndex >= activeBook.interiorPages.length - 1}
                  onClick={() => handlePageChange(currentPageIndex + 1)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-xs text-white"
                  title="Next Page"
                >
                  →
                </button>
              </div>
            )}

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all uppercase ${
                autoRotate
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {autoRotate ? "Auto-Spin ON" : "Auto-Spin OFF"}
            </button>

            <button
              onClick={resetView}
              className="px-2.5 py-1.5 rounded-full text-[11px] font-mono text-white/60 hover:text-white hover:bg-white/10 transition-all uppercase"
              title="Reset angle"
            >
              Reset ↺
            </button>
          </div>
        </div>

        {/* Right Info & Page Explorer */}
        <div className="lg:col-span-4 flex flex-col justify-between text-left space-y-5">
          <div>
            <div className="text-[11px] font-mono text-[#c9a84c] uppercase tracking-widest mb-1.5">
              {activeBook.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeBook.title}
            </h3>
            <p className="text-xs text-[#c9a84c] font-mono mt-1">
              {activeBook.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
              {activeBook.description}
            </p>
          </div>

          {/* Quick Page Navigator for Multi-page Books */}
          {activeBook.totalPages > 1 && (
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
                <span>Select Page Preview:</span>
                <span className="text-[#c9a84c]">
                  Showing Page {currentPageIndex + 1} of {activeBook.totalPages}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto pr-1">
                {activeBook.interiorPages.slice(0, 15).map((pageImg, idx) => (
                  <button
                    key={pageImg}
                    onClick={() => handlePageChange(idx)}
                    className={`aspect-[3/4] rounded overflow-hidden border transition-all ${
                      currentPageIndex === idx
                        ? "border-[#c9a84c] ring-2 ring-[#c9a84c]/50 scale-105"
                        : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/40"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pageImg}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Full Screen View Button */}
          {onOpenInModal && (
            <button
              onClick={() => onOpenInModal(activeBook, currentPageIndex)}
              className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-[#c9a84c] hover:text-black text-white font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-[#c9a84c]"
            >
              <span>🔍 View Full Resolution In Reader</span>
              <span>↗</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
