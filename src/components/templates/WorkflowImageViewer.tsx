"use client";

import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface WorkflowImageViewerProps {
  slug: string;
  templateName: string;
}

export function WorkflowImageViewer({ slug, templateName }: WorkflowImageViewerProps) {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, [slug]);

  const loadImages = async () => {
    setIsLoading(true);
    setError(null);

    // For missed-call-text-back, we have 2 images
    const imageCount = slug === "missed-call-text-back" ? 2 : 1;
    const loadedImages: string[] = [];

    for (let i = 0; i < imageCount; i++) {
      const imageName = imageCount > 1 ? `${slug}-${i + 1}.png` : `${slug}.png`;
      
      // Try Supabase storage first
      const supabaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/template-images/${imageName}`;
      
      // Fallback to public folder
      const publicUrl = `/images/templates/${imageName}`;

      try {
        // Try to fetch from Supabase
        const response = await fetch(supabaseUrl, { method: "HEAD" });
        if (response.ok) {
          loadedImages.push(supabaseUrl);
        } else {
          // Fallback to public folder
          loadedImages.push(publicUrl);
        }
      } catch {
        // If fetch fails, use public folder
        loadedImages.push(publicUrl);
      }
    }

    setImages(loadedImages);
    setIsLoading(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleZoomToFit = (controls: any) => {
    controls.resetTransform();
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div className="w-full h-[600px] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700">
        <div className="text-center">
          <p className="text-slate-400 mb-2">Screenshot coming soon</p>
          <p className="text-slate-500 text-sm">{templateName}</p>
        </div>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];
  const isMultiImage = images.length > 1;

  return (
    <div className="w-full">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.5}
        maxScale={4}
        wheel={{ step: 100 }}
        panning={{ disabled: false }}
        pinch={{ disabled: false }}
      >
        {(utils) => (
          <>
            <div className="relative bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
              {/* Toolbar */}
              <div className="absolute top-4 right-4 z-10 flex gap-2 bg-slate-800/90 backdrop-blur rounded-lg p-2 border border-slate-700">
                <button
                  onClick={() => utils.zoomIn()}
                  className="p-2 hover:bg-slate-700 rounded transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5 text-amber-500" />
                </button>
                <button
                  onClick={() => utils.zoomOut()}
                  className="p-2 hover:bg-slate-700 rounded transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5 text-amber-500" />
                </button>
                <button
                  onClick={() => handleZoomToFit(utils)}
                  className="p-2 hover:bg-slate-700 rounded transition-colors"
                  title="Fit to Screen"
                >
                  <Maximize2 className="w-5 h-5 text-amber-500" />
                </button>
              </div>

              {/* Image Container */}
              <TransformComponent
                wrapperClass="w-full h-[600px]"
                contentClass="w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={currentImage}
                    alt={`${templateName} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/placeholder.png";
                    }}
                  />
                </div>
              </TransformComponent>

              {/* Navigation for multi-image templates */}
              {isMultiImage && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-800/90 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6 text-amber-500" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-800/90 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                    title="Next Image"
                  >
                    <ChevronRight className="w-6 h-6 text-amber-500" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-amber-500"
                            : "bg-slate-600 hover:bg-slate-500"
                        }`}
                        title={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <div className="absolute bottom-4 right-4 z-10 bg-slate-800/90 backdrop-blur rounded px-3 py-1 border border-slate-700 text-sm text-slate-300">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
