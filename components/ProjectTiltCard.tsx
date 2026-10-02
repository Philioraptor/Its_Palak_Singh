"use client";
import { useState, useRef } from "react";
import { ProjectItem } from "@/components/LightboxModal";

interface ProjectTiltCardProps {
  project: ProjectItem;
  onClick: () => void;
}

export default function ProjectTiltCard({ project, onClick }: ProjectTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotX = (0.5 - y) * 14;
    const rotY = (x - 0.5) * 14;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    );
    setGlareStyle({
      opacity: 0.22,
      x: x * 100,
      y: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: transformStyle ? "transform 0.12s ease-out" : "transform 0.5s ease",
        transformStyle: "preserve-3d",
      }}
      className="project-card clickable-card group flex flex-col justify-between relative overflow-hidden"
    >
      {/* Dynamic Specular 3D Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(201,168,76,0.35) 0%, transparent 65%)`,
        }}
      />

      {/* Image Preview Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616] flex items-center justify-center p-3 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.img}
          alt={project.title}
          className="project-thumb-img max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Expand Badge */}
        <div className="expand-badge z-30">
          <span>View Full Design</span>
          <span className="text-xs">↗</span>
        </div>

        {/* Number Watermark */}
        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/40">
          #{project.num}
        </div>
      </div>

      {/* Card Meta & Details */}
      <div className="p-5 flex flex-col justify-between flex-1 border-t border-white/5 bg-[#0f0f0f] z-10">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#c9a84c] mb-1.5 uppercase">
            <span>{project.category}</span>
            <span className="text-white/40">{project.year}</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#c9a84c] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-white/55 mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
