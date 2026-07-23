// Dynamic photo album loader
import { availableAlbums } from './photos/index.js';

export async function getAlbumPhotos(albumName) {
  try {
    const module = await import(`./photos/${albumName}.js`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load photos for album: ${albumName}`, error);
    return [];
  }
}

// Export available albums dynamically
export { availableAlbums };

// Convenience function to get available albums
export async function getAvailableAlbums() {
  return availableAlbums;
}
