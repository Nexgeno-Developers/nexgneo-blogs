// export function getYoutubeEmbedUrl(url: string) {
//   if (!url) return null;

//   try {
//     const parsed = new URL(url);

//     // youtu.be/VIDEO_ID
//     if (parsed.hostname.includes("youtu.be")) {
//       return `https://www.youtube.com/embed${parsed.pathname}`;
//     }

//     // youtube.com/watch?v=VIDEO_ID
//     if (parsed.searchParams.get("v")) {
//       return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
//     }

//     return null;
//   } catch {
//     return null;
//   }

//     const regExp =
//     /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

// export function getYoutubeVideoId(url: string) {
//   if (!url) return null;

//   const regExp =
//     /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

export function getYoutubeVideoId(url: string) {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);
  return match ? match[1] : null;
}

