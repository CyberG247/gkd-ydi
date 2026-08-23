import { useState, useEffect, useRef, type ImgHTMLAttributes } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  containerClassName?: string;
  zoomOnHover?: boolean;
  blurUp?: boolean;
}

export function LazyImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  aspectRatio,
  zoomOnHover = false,
  blurUp = true,
  loading = "lazy",
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-mist/60",
        aspectRatio,
        containerClassName,
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Shimmer Placeholder */}
      {!loaded && !error && (
        <div
          aria-hidden="true"
          className="skeleton-shimmer absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="size-6 animate-spin rounded-full border-2 border-ocean/20 border-t-ocean" />
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-mist p-4 text-center text-muted-foreground">
          <ImageIcon className="size-8 opacity-40" />
          <span className="text-xs">Unable to display image</span>
        </div>
      )}

      {/* Actual Image with Blur-Up Transition */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "size-full object-cover transition-all duration-700 ease-out",
          blurUp && (!loaded ? "scale-105 blur-md opacity-0" : "scale-100 blur-0 opacity-100"),
          zoomOnHover && "group-hover:scale-105 group-hover:transition-transform group-hover:duration-500",
          className,
        )}
        {...props}
      />
    </div>
  );
}
