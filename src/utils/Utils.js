import Preloader from "../utils/Preloader.js";
import content from "../data/content";
import { getAlbumPhotos } from "../data/photos.js";

export function getMarkerOffset() {
  const x =
    window.innerWidth / 2 -
    (window.innerWidth - document.querySelector(".js-content").offsetWidth) / 2;
  const y = 0;
  return [x, y];
}

export async function preloadFirstImages() {
  let photosArray = [];

  // Add cover images
  Object.keys(content.octnov).forEach((entry) => {
    photosArray.push(content.octnov[entry].cover);
  });

  // Add first 4 photos from each album
  for (const entry of Object.keys(content.octnov)) {
    try {
      const photos = await getAlbumPhotos(entry);
      const firstPhotos = photos.slice(0, 4);
      photosArray.push(...firstPhotos.map((photo) => photo.src));
    } catch (error) {
      console.error(`Failed to load photos for ${entry}:`, error);
    }
  }

  return Preloader.load(photosArray);
}

export function getNavigatorLanguage() {
  let lang = "en";
  if (navigator.languages && navigator.languages.length) {
    lang = navigator.languages[0];
  } else {
    lang =
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      "en";
  }
  return lang.substring(0, 2);
}
