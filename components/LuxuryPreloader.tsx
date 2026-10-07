"use client";
import { useState, useEffect, useRef } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

const PRELOAD_IMAGES = [
  {
    src: "/palak-pics/loader-1.webp",
    title: "Palak Singh",
    subtitle: "Visual Identity & Editorial Direction",
    badge: "01 / 05",
  },
  {
    src: "/palak-pics/loader-2.webp",
    title: "Graphic Designer",
    subtitle: "Brand Systems & Commercial Packaging",
    badge: "02 / 05",
  },
  {
    src: "/palak-pics/loader-3.webp",
    title: "Brand Architect",
    subtitle: "Publication Design & Typography Systems",
    badge: "03 / 05",
  },
  {
    src: "/palak-pics/loader-4.webp",
    title: "Creative Artist",
    subtitle: "Digital Inking & Character Styling",
    badge: "04 / 05",
  },
  {
    src: "/palak-pics/loader-5.webp",
    title: "Visual Storyteller",
    subtitle: "Vector Art & Modern Aesthetics",
    badge: "05 / 05",
  },
];

export default function LuxuryPreloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Pre-cache all 5 images immediately into browser cache
  useEffect(() => {
    PRELOAD_IMAGES.forEach((img) => {
      const i = new window.Image();
      i.src = img.src;
    });
  }, []);

  const finishLoader = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 600);
  };

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3200; // 3.2s smooth cinematic showcase (~640ms per image)

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      const imgIdx = Math.min(
        PRELOAD_IMAGES.length - 1,
        Math.floor((rawProgress / 100) * PRELOAD_IMAGES.length)
      );
      setActiveImageIndex(imgIdx);

      if (rawProgress >= 100) {
        clearInterval(timer);
        setTimeout(finishLoader, 300);
      }
    }, 35);

    return () => clearInterval(timer);
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#070707] flex flex-col justify-between p-6 sm:p-12 select-none pointer-events-auto transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-white/50 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-[#c9a84c]">
          <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-ping" />
          <span>PALAK SINGH · PORTFOLIO ARCHIVE</span>
        </div>
        <button
          onClick={finishLoader}
          className="text-white/60 hover:text-[#c9a84c] transition-colors cursor-pointer border border-white/10 px-3 py-1 rounded-full text-[10px]"
        >
          Skip Intro ↗
        </button>
      </div>

      {/* Center Showcase: Editorial Portrait Card Flash */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        {/* Floating Photo Window */}
        <div className="relative w-48 sm:w-60 md:w-68 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#c9a84c]/60 shadow-[0_0_50px_rgba(201,168,76,0.25)] bg-[#121212]">
          {PRELOAD_IMAGES.map((img, i) => (
            <div
              key={img.badge}
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                activeImageIndex === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              {/* Card Meta Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
                  {img.badge}
                </span>
                <div className="text-xs font-bold text-white mt-1.5">{img.title}</div>
                <div className="text-[10px] text-white/60 font-mono truncate">{img.subtitle}</div>
              </div>
            </div>
          ))}

          {/* Corner Gold Flourishes */}
          <div className="absolute top-2 left-2 text-[10px] text-[#c9a84c] font-mono pointer-events-none">✦</div>
          <div className="absolute top-2 right-2 text-[10px] text-[#c9a84c] font-mono pointer-events-none">✦</div>
        </div>

        {/* 5-Step Visual Image Indicators */}
        <div className="flex items-center gap-1.5 mt-4">
          {PRELOAD_IMAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeImageIndex === i
                  ? "w-7 bg-[#c9a84c] shadow-[0_0_10px_#c9a84c]"
                  : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Status Prompt */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-white/70 uppercase tracking-widest">
          <span className="text-[#c9a84c]">Loading Visual Experience</span>
          <span className="inline-block animate-pulse">...</span>
        </div>
      </div>

      {/* Bottom Bar: Monolithic Progress Counter & Line */}
      <div className="w-full max-w-2xl mx-auto pt-4 border-t border-white/10">
        <div className="flex items-end justify-between mb-2">
          <div className="text-left">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">System Status</span>
            <span className="text-xs font-mono text-[#c9a84c]">
              {progress < 100 ? "Loading Curated Assets..." : "System Ready. Entering Portfolio."}
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tighter">
            {progress < 10 ? `0${progress}` : progress}%
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c9a84c] transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_#c9a84c]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
