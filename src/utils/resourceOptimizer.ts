/**
 * Resource optimizer utility for aggressive preloading of photos and videos.
 * Runs during idle time to warm up the browser's HTTP cache.
 */

// Track loaded URLs to avoid duplicate fetches
const preloadedImages = new Set<string>();
const preloadedVideos = new Set<string>();

/**
 * Preload a batch of image URLs sequentially or concurrently during idle time
 */
export function preloadImages(urls: string[], priority: 'high' | 'idle' = 'idle'): void {
  if (typeof window === 'undefined') return;

  const loadBatch = () => {
    urls.forEach((url) => {
      if (!url || preloadedImages.has(url)) return;
      preloadedImages.add(url);
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    });
  };

  if (priority === 'high' || !('requestIdleCallback' in window)) {
    loadBatch();
  } else {
    window.requestIdleCallback(() => loadBatch(), { timeout: 2000 });
  }
}

/**
 * Preload video metadata/buffer by injecting a hidden pre-buffered video or link
 */
export function preloadVideo(url: string): void {
  if (typeof window === 'undefined' || !url || preloadedVideos.has(url)) return;
  preloadedVideos.add(url);

  try {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = url;
    video.muted = true;
    video.playsInline = true;
    video.style.display = 'none';
    document.body.appendChild(video);

    // Clean up after metadata is loaded
    video.onloadedmetadata = () => {
      setTimeout(() => {
        try {
          if (video.parentNode) {
            document.body.removeChild(video);
          }
        } catch {
          // ignore
        }
      }, 3000);
    };
  } catch {
    // fallback ignore
  }
}
