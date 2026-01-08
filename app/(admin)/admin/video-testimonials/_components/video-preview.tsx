interface VideoPreviewProps {
  url?: string;
}

export function VideoPreview({ url }: VideoPreviewProps) {
  if (!url) return "—";

  return (
    <video
      src={url}
      controls
      preload="metadata"
      className="h-20 w-32 rounded border"
    />
  );
}
