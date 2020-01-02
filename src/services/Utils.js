import Preloader from '../services/Preloader.js'

export default {
  getMarkerOffset () {
    const x = (window.innerWidth / 2) - ((window.innerWidth - document.querySelector('.js-content').offsetWidth) / 2)
    const y = 0
    return [x, y]
  },
  preLoadFirstImages (content) {
    let photosArray = []
    Object.keys(content).forEach(entry => {
      console.log(content[entry])
      photosArray.push(content[entry].cover.src)
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
  }
}
