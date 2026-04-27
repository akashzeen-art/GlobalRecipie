import { useRef, useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";

interface VideoCardProps {
  image: string;
  video: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export const VideoCard = ({ image, video, title, className = "", children }: VideoCardProps) => {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const [open,     setOpen]     = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <div
        className={`group relative overflow-hidden cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setOpen(true)}
      >
        {/* Thumbnail */}
        <img
          src={image}
          alt={title ?? ""}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovering ? "opacity-0" : "opacity-100"}`}
        />
        {/* Hover preview (muted, no controls) */}
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}
        />
        {children}
      </div>

      {/* Full player modal on click */}
      {open && (
        <VideoPlayer
          video={video}
          image={image}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
