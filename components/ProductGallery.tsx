'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full bg-slate-50 rounded-3xl overflow-hidden border border-border flex items-center justify-center">
        <span className="text-slate-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-slate-50 rounded-3xl overflow-hidden border border-border">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails Gallery */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                mainImage === img ? 'border-primary shadow-md' : 'border-border hover:border-slate-300'
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}