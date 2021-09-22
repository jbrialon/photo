import Preloader from '../services/Preloader.js'
import content from '../data/content'

const converter = require('@tmcw/togeojson')
const DOMParser = require('xmldom').DOMParser

export function getMarkerOffset () {
  const x = (window.innerWidth / 2) - ((window.innerWidth - document.querySelector('.js-content').offsetWidth) / 2)
  const y = 0
  return [x, y]
}

export function preloadFirstImages () {
  let photosArray = []
  Object.keys(content.octnov).forEach(entry => {
    photosArray.push(content.octnov[entry].cover.src)
    // create a new context to get all images in assets/photos
    const req = require.context('../assets/photos', true, /\.jpg$/)
    const photos = req.keys()
      // filter them by folder name (simple check if path contains album name)
      .filter(item => item.includes(`/${entry}/`))
      // return an Array of require items
      .map(item => req(item))
      .map((item) => {
        return item.src
      })
      .slice(0, 4)
    photosArray.push(...photos)
  })
  return Preloader.load(photosArray)
}

export function getNavigatorLanguage () {
  let lang = 'en'
  if (navigator.languages && navigator.languages.length) {
    lang = navigator.languages[0]
  } else {
    lang = navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en'
  }
  return lang.substring(0, 2)
}

export function getGPXasJSON (gpx) {
  fetch(gpx)
    .then(response => response.text())
    .then(str => {
      const parsedGPX = new DOMParser().parseFromString(str)
      const geojson = converter.gpx(parsedGPX)

      console.log(JSON.stringify(geojson))
      return geojson
    })
}
