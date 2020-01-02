import Preloader from '../services/Preloader.js'
import ImageLoaderWorker from './ImageLoader.worker'
import content from '../data/content'

export default {
  getMarkerOffset () {
    const x = (window.innerWidth / 2) - ((window.innerWidth - document.querySelector('.js-content').offsetWidth) / 2)
    const y = 0
    return [x, y]
  },
  preloadFirstImages () {
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
      .slice(0, 5)
      photosArray.push(...photos)
    })
    return Preloader.load(photosArray)
  },
  preloadImages () {
    const imageLoader = new ImageLoaderWorker()
    // Once again, it's possible that messages could be returned before the
    // listener is attached, so we need to attach the listener before we pass
    // image URLs to the web worker
    imageLoader.addEventListener('message', event => {
      // Grab the message data from the event
      const imageData = event.data
      const src = imageData.imageURL

      let image = new Image()
      image.onload = function () {
        console.log('preload', src)
      }
      image.onerror = function (err) {
        console.error('Could not preload', src, err)
      }
      image.src = src
    })

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
      photosArray.push(...photos)
    })

    photosArray.forEach(photoURL => {
      imageLoader.postMessage(photoURL)
    })
  }
}
