import { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 animate-fade-in">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto scrollbar-hide md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative flex-shrink-0 h-20 w-20 rounded-2xl overflow-hidden border-2 transition-all duration-300",
              active === i
                ? "border-foreground shadow-soft scale-105"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
            aria-label={`View image ${i + 1}`}
          >
            <img
              src={img}
              alt={`${alt} thumbnail ${i + 1}`}
              loading="lazy"
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image with zoom */}
      <div
        ref={ref}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMove}
        className="relative flex-1 aspect-square rounded-3xl overflow-hidden gradient-hero shadow-premium cursor-zoom-in group"
      >
        <img
          src={images[active]}
          alt={alt}
          width={1024}
          height={1024}
          className="h-full w-full object-contain p-8 transition-transform duration-500"
          style={
            zoom
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${pos.x}% ${pos.y}%`,
                }
              : undefined
          }
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold tracking-wide">
          {active + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
