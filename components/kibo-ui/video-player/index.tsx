"use client";

import React, { useRef } from "react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { Maximize2, Minimize2, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

// =========================
// 🎨 Custom Variables
// =========================
const variables = {
  "--media-primary-color": "var(--primary)",
  "--media-secondary-color": "var(--background)",
  "--media-text-color": "var(--foreground)",
  "--media-background-color": "var(--background)",
  "--media-control-hover-background": "var(--accent)",
  "--media-font-family": "var(--font-sans)",
  "--media-live-button-icon-color": "var(--muted-foreground)",
  "--media-live-button-indicator-color": "var(--destructive)",
  "--media-range-track-background": "var(--border)",
} as CSSProperties;

// =========================
// 🧩 Main Video Player Wrapper
// =========================
export type VideoPlayerProps = ComponentProps<typeof MediaController>;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController
    style={{
      ...variables,
      ...style,
    }}
    {...props}
  />
);

// =========================
// 🎛️ Control Components
// =========================
export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;
export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;
export const VideoPlayerTimeRange = ({
  className,
  ...props
}: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;
export const VideoPlayerTimeDisplay = ({
  className,
  ...props
}: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;
export const VideoPlayerVolumeRange = ({
  className,
  ...props
}: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;
export const VideoPlayerPlayButton = ({
  className,
  ...props
}: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;
export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;
export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;
export const VideoPlayerMuteButton = ({
  className,
  ...props
}: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("p-2.5", className)} {...props} />
);

// =========================
// 📺 Video Content
// =========================
export type VideoPlayerContentProps = ComponentProps<"video">;
export const VideoPlayerContent = ({
  className,
  ...props
}: VideoPlayerContentProps) => (
  <video className={cn("mt-0 mb-0", className)} {...props} />
);

// =========================
// 🖥️ Wide Mode Button
// =========================
type VideoPlayerWideButtonProps = {
  isWide: boolean;
  onToggleWide: () => void;
} & ComponentProps<"button">;

export const VideoPlayerWideButton = ({
  isWide,
  onToggleWide,
  className,
  ...props
}: VideoPlayerWideButtonProps) => (
  <Button
    onClick={onToggleWide}
    className={cn(
      "p-2.5 text-white bg-transparent hover:bg-white/10 rounded-md transition max-xl:hidden block",
      className
    )}
    title={isWide ? "Exit Wide Mode" : "Wide Mode"}
    {...props}
  >
    {isWide ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
  </Button>
);

// =========================
// 🧭 Full Screen Button
// =========================
export const VideoPlayerFullScreenButton = ({
  className,
}: {
  className?: string;
}) => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  // ✅ toggle fullscreen mode
  const toggleFullScreen = () => {
    const element = videoContainerRef.current?.closest(
      "media-controller"
    ) as HTMLElement | null;

    if (!document.fullscreenElement) {
      element?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <Button
      onClick={toggleFullScreen}
      className={cn(
        "p-2.5 text-white bg-transparent hover:bg-white/10 rounded-md transition",
        className
      )}
      title="Toggle Fullscreen"
      ref={videoContainerRef as any}
    >
      {!document.fullscreenElement ? (
        <Maximize size={18} />
      ) : (
        <Minimize size={18} />
      )}
    </Button>
  );
};
