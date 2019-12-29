export default {
  getMarkerOffset () {
    const x = (window.innerWidth / 2) - ((window.innerWidth - document.querySelector('.js-content').offsetWidth) / 2)
    const y = 0
    return [x, y]
  }
}
