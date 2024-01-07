import Preloader from "../utils/Preloader.js";
import content from "../data/content";
import photosData from "../data/photos";

export function getMarkerOffset() {
  const x =
    window.innerWidth / 2 -
    (window.innerWidth - document.querySelector(".js-content").offsetWidth) / 2;
  const y = 0;
  return [x, y];
}

export function preloadFirstImages() {
  let photosArray = [];
  Object.keys(content.octnov).forEach((entry) => {
    photosArray.push(content.octnov[entry].cover);
    const photos = photosData[entry].slice(0, 4);
    photosArray.push(...photos.map((photo) => photo.src));
  });
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
