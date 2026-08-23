import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useCallback } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

interface MediaGalleryModalProps {
  images: GalleryImage[];
  currentIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function MediaGalleryModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: MediaGalleryModalProps) {
  const currentImage = currentIndex !== null && images[currentIndex] ? images[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else if (currentIndex !== null && currentIndex === 0) {
      onNavigate(images.length - 1);
    }
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex !== null && currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    } else if (currentIndex !== null && currentIndex === images.length - 1) {
      onNavigate(0);
    }
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl border-white/10 bg-navy-deep/95 p-0 text-white shadow-2xl backdrop-blur-xl sm:rounded-lg">
        <DialogTitle className="sr-only">{currentImage.caption || currentImage.alt}</DialogTitle>
        <div className="relative flex min-h-[50vh] max-h-[85vh] flex-col items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute top-3 right-3 z-50 rounded-full bg-black/50 p-2 text-white/80 transition-colors hover:bg-black/80 hover:text-white"
          >
            <X className="size-5" />
          </button>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[68vh] w-auto max-w-full rounded object-contain shadow-md"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white/90 transition-all hover:bg-black/90 hover:scale-110"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white/90 transition-all hover:bg-black/90 hover:scale-110"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 flex w-full flex-col items-center justify-between gap-2 border-t border-white/10 pt-3 text-center sm:flex-row sm:text-left">
            <p className="text-sm font-medium text-white/90">
              {currentImage.caption || currentImage.alt}
            </p>
            {images.length > 1 && (
              <span className="text-xs font-semibold tracking-wider text-yellow uppercase">
                {(currentIndex ?? 0) + 1} of {images.length}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
