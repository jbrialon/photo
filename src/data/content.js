const url = 'https://www.completementalest.fr'
export default {
  'meta': {
    title: 'Complétement à l\'est //',
    author: 'Jérémy Brialon',
    meta: [
      { name: 'og:url', content: url },
      { name: 'og:image', content: `${url}${require('../assets/img/meta_share.gif')}` },
      { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share.gif')}` }
    ],
    octnov: [
      { name: 'og:url', content: `${url}/octnov` },
      { name: 'og:image', content: `${url}${require('../assets/img/meta_share_octnov.gif')}` },
      { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_octnov.gif')}` }
    ]
  },
  'about': {
    cover: require('../assets/photos/cover.jpg'),
    meta: [
      { name: 'og:url', content: `${url}/about` }, // TODO: should be dynamic
      { name: 'og:image', content: `${url}${require('../assets/img/meta_share.gif')}` },
      { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share.gif')}` }
    ]
  },
  'octnov': {
    'japan': {
      name: 'japan',
      cover: require('../assets/covers/cover-japon.jpg'),
      text: '日本国',
      gps: {lat: 26.212312, lon: 127.679157},
      zoom: 9,
      pitch: 0
    },
    'nepal': {
      name: 'nepal',
      cover: require('../assets/covers/cover-nepal.jpg'),
      text: 'नेपाल',
      gps: {lat: 27.717245, lon: 85.323960},
      zoom: 10,
      pitch: 0
    },
    'annapurna': {
      name: 'annapurna',
      cover: require('../assets/covers/cover-annapurna.jpg'),
      text: 'अन्नपूर्ण संरक्षण क्षेत्र',
      gps: {lat: 27.717245, lon: 85.323960},
      zoom: 11,
      pitch: 60
    },
    'thailand': {
      name: 'thailand',
      cover: require('../assets/covers/cover-thailande.jpg'),
      text: 'ราชอาณาจักรไทย',
      gps: {lat: 13.736717, lon: 100.523186},
      zoom: 10,
      pitch: 0
    }
  },
  'albums': {
    'thailand': {
      name: 'thailand',
      cover: require('../assets/photos/thailand/thailand-14.jpg'),
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/thailand` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_thailand.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_thailand.gif')}` }
      ]
    },
    'annapurna': {
      name: 'annapurna',
      cover: require('../assets/photos/annapurna/annapurna-25.jpg'),
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/annapurna` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_annapurna.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_annapurna.gif')}` }
      ]
    },
    'nepal': {
      name: 'nepal',
      cover: require('../assets/photos/nepal/nepal-09.jpg'),
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/nepal` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_nepal.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_nepal.gif')}` }
      ]
    },
    'japan': {
      name: 'japan',
      cover: require('../assets/photos/japan/japon-006.jpg'),
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/japan` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_japan.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_japan.gif')}` }
      ]
    },
    'istanbul': {
      name: 'istanbul',
      cover: require('../assets/photos/istanbul/istanbul-11.jpg'),
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/istanbul` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_istanbul.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_istanbul.gif')}` }
      ]
    },
    'myanmar': {
      name: 'myanmar',
      cover: require('../assets/photos/myanmar/myanmar-11.jpg'),
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/myanmar` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_myanmar.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_myanmar.gif')}` }
      ]
    },
    'malaysia': {
      name: 'malaysia',
      cover: require('../assets/photos/malaysia/malaisie-10.jpg'),
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/malaysia` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_malaysia.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_malaysia.gif')}` }
      ]
    },
    'kilimanjaro': {
      name: 'kilimanjaro',
      cover: require('../assets/photos/kilimanjaro/kilimanjaro-26.jpg'),
      shuffle: false,
      hidden: false,
      grid: false,
      meta: [
        { name: 'og:url', content: `${url}/album/kilimanjaro` },
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_kilimanjaro.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_kilimanjaro.gif')}` }
      ]
    }
  },
  'social': [
    {
      'title': 'mail',
      'link': 'mailto:jeremy@completementalest.fr'
    },
    {
      'title': 'instagram',
      'link': 'https://www.instagram.com/jbrialon/'
    }
  ]
}
