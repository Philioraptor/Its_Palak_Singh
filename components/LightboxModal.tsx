"use client";
import { useEffect, useState } from "react";

export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  img: string;
  description: string;
  tags?: string[];
  pages?: string[];
  initialPage?: number;
}

interface LightboxModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCount: number;
}

export default function LightboxModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: LightboxModalProps) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  useEffect(() => {
    if (project?.initialPage !== undefined) {
      setActivePageIndex(project.initialPage);
    } else {
      setActivePageIndex(0);
    }
  }, [project]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        if (project?.pages && project.pages.length > 1 && activePageIndex < project.pages.length - 1) {
          setActivePageIndex((p) => p + 1);
        } else {
          onNext();
        }
      }
      if (e.key === "ArrowLeft") {
        if (project?.pages && project.pages.length > 1 && activePageIndex > 0) {
          setActivePageIndex((p) => p - 1);
        } else {
          onPrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onNext, onPrev, project, activePageIndex]);

  if (!isOpen || !project) return null;

  const currentDisplayImg =
    project.pages && project.pages.length > 0
      ? project.pages[activePageIndex]
      : project.img;

  const hasMultiplePages = Boolean(project.pages && project.pages.length > 1);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/94 backdrop-blur-xl animate-fadeIn p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-20 border-b border-white/10 bg-black/50 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest text-[#c9a84c] uppercase">
            {project.category}
          </span>
          <span className="text-white/20">/</span>
          <span className="text-xs text-white/60 font-mono tracking-wider">
            Project {String(currentIndex + 1).padStart(2, "0")} of {String(totalCount).padStart(2, "0")}
          </span>
          {hasMultiplePages && (
            <>
              <span className="text-white/20">/</span>
              <span className="text-xs text-[#c9a84c] font-mono tracking-wider bg-[#c9a84c]/15 px-2 py-0.5 rounded">
                Page {activePageIndex + 1} of {project.pages!.length}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={currentDisplayImg}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wider uppercase text-white/70 hover:text-[#c9a84c] transition-colors px-3 py-1.5 rounded border border-white/10 hover:border-[#c9a84c]/50 hidden sm:inline-block"
          >
            Open Original ↗
          </a>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all text-lg"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Project Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-all text-xl backdrop-blur-sm"
        title="Previous Project (←)"
      >
        ←
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-all text-xl backdrop-blur-sm"
        title="Next Project (→)"
      >
        →
      </button>

      {/* Main Content Area */}
      <div
        className="relative flex flex-col items-center justify-center max-w-6xl w-full max-h-[92vh] z-10 pt-16 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full Image Container */}
        <div className="relative flex items-center justify-center max-h-[64vh] sm:max-h-[68vh] w-full overflow-hidden rounded-md shadow-2xl border border-white/10 bg-[#0d0d0d]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentDisplayImg}
            alt={project.title}
            className="max-h-[64vh] sm:max-h-[68vh] max-w-full w-auto h-auto object-contain select-none"
          />

          {/* Page flip buttons overlay if multiple pages */}
          {hasMultiplePages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15">
              <button
                disabled={activePageIndex <= 0}
                onClick={() => setActivePageIndex((p) => Math.max(0, p - 1))}
                className="px-2 py-0.5 text-xs text-white/80 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                ◀ Prev Page
              </button>
              <span className="text-[11px] font-mono text-[#c9a84c]">
                {activePageIndex + 1} / {project.pages!.length}
              </span>
              <button
                disabled={activePageIndex >= project.pages!.length - 1}
                onClick={() => setActivePageIndex((p) => Math.min(project.pages!.length - 1, p + 1))}
                className="px-2 py-0.5 text-xs text-white/80 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                Next Page ▶
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Strip if multi-page book */}
        {hasMultiplePages && (
          <div className="w-full mt-3 overflow-x-auto flex items-center gap-2 py-1 px-1 no-scrollbar">
            {project.pages!.map((pgUrl, idx) => (
              <button
                key={pgUrl}
                onClick={() => setActivePageIndex(idx)}
                className={`w-10 sm:w-12 aspect-[3/4] flex-shrink-0 rounded overflow-hidden border transition-all ${
                  activePageIndex === idx
                    ? "border-[#c9a84c] ring-2 ring-[#c9a84c]/60 scale-105"
                    : "border-white/15 opacity-50 hover:opacity-90"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pgUrl} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Caption & Meta */}
        <div className="mt-3 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 text-left">
          <div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight flex items-center gap-3">
              {project.title}
              <span className="text-xs px-2 py-0.5 rounded border border-[#c9a84c]/40 text-[#c9a84c] font-normal font-mono">
                {project.year}
              </span>
            </h3>
            <p className="text-xs text-white/60 mt-1 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="text-[10px] text-white/40 font-mono tracking-wider whitespace-nowrap">
            Press <span className="text-white/70">←</span> / <span className="text-white/70">→</span> to navigate
          </div>
        </div>
      </div>
    </div>
  );
}
