const url = 'https://www.completementalest.fr'
export default {
  'meta': {
    title: 'Complétement à l\'est //',
    author: 'Jérémy Brialon',
    meta: [
      { name: 'og:url', content: url },
      { name: 'og:image', content: `${url}${require('../assets/img/meta_share.gif')}` },
      { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share.gif')}` }
    ]
  },
  'about': {
    cover: require('../assets/photos/cover.jpg'),
    displayName: 'about',
    text: '↟ Hello my name is Jérémy ↟ <br> ↟ I like going places and take pictures ↟',
    meta: [
      { name: 'og:url', content: `${url}/about` }, // TODO: should be dynamic
      { name: 'og:image', content: `${url}${require('../assets/img/meta_share.gif')}` },
      { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share.gif')}` }
    ]
  },
  'octnov': {
    'japon': {
      name: 'japon',
      displayName: 'Japon',
      cover: require('../assets/covers/cover-japon.jpg'),
      text: 'Jérémy tout seul',
      gps: {lat: 26.212312, lon: 127.679157}
    },
    'nepal': {
      name: 'nepal',
      displayName: 'Népal',
      cover: require('../assets/covers/cover-nepal.jpg'),
      text: 'Jérémy au pays des momos test',
      gps: {lat: 27.717245, lon: 85.323960}
    },
    'annapurna': {
      name: 'annapurna',
      displayName: 'Annapurna',
      cover: require('../assets/covers/cover-annapurna.jpg'),
      text: 'Jérémy chez les Yaks',
      gps: {lat: 27.717245, lon: 85.323960}
    },
    'thailande': {
      name: 'thailande',
      displayName: 'Thaïlande',
      cover: require('../assets/covers/cover-thailande.jpg'),
      text: 'Jérémy a la plage',
      gps: {lat: 13.736717, lon: 100.523186}
    }
  },
  'albums': {
    'annapurna': {
      name: 'annapurna',
      displayName: 'annapurna',
      cover: require('../assets/photos/annapurna/annapurna-28.jpg'),
      text: '',
      shuffle: false,
      hidden: true,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/annapurna` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/photos/annapurna/annapurna-34.jpg')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/photos/annapurna/annapurna-34.jpg')}` }
      ]
    },
    'istanbul': {
      name: 'istanbul',
      displayName: 'Istanbul',
      cover: require('../assets/photos/istanbul/istanbul-11.jpg'),
      text: '4 days / 3 nights to visit a city on the border between the East and the West and bathed by the waters of the Bosphorus',
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/istanbul` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_istanbul.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_istanbul.gif')}` }
      ]
    },
    'myanmar': {
      name: 'myanmar',
      displayName: 'Myanmar',
      cover: require('../assets/photos/myanmar/myanmar-11.jpg'),
      text: '18 days / 17 nights and a lot of night buses to travel around Myanmar',
      shuffle: false,
      hidden: false,
      grid: true,
      meta: [
        { name: 'og:url', content: `${url}/album/myanmar` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_myanmar.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_myanmar.gif')}` }
      ]
    },
    'malaysia': {
      name: 'malaysia',
      displayName: 'Malaysia',
      cover: require('../assets/photos/malaysia/malaisie-10.jpg'),
      text: '18 days / 17 nights to travel around Malaysia with <a class="link" href="http://www.voyatopia.com/" target="_blank">voyatopia</a>',
      shuffle: false,
      hidden: false,
      grid: false,
      meta: [
        { name: 'og:url', content: `${url}/album/malaysia` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_malaysia.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_malaysia.gif')}` }
      ]
    },
    'kilimanjaro': {
      name: 'kilimanjaro',
      displayName: 'Kilimanjaro',
      cover: require('../assets/photos/kilimanjaro/kilimanjaro-26.jpg'),
      text: '6 days / 4 nights of trekking in Tanzania to climb mount Kilimanjaro (5985m) by the Machame route',
      shuffle: false,
      hidden: false,
      grid: false,
      meta: [
        { name: 'og:url', content: `${url}/album/kilimanjaro` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_kilimanjaro.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_kilimanjaro.gif')}` }
      ]
    },
    'islande': {
      name: 'islande',
      displayName: 'Ísland',
      cover: require('../assets/photos/islande/islande-53.jpg'),
      text: '11 days / 0 night to go around Iceland in 4WD Clio ',
      shuffle: true,
      hidden: false,
      grid: false,
      meta: [
        { name: 'og:url', content: `${url}/album/islande` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share.gif')}` }
      ]
    }
  },
  'social': [
    {
      'title': 'mail',
      'link': 'mailto:jeremzor@gmail.com' // this will backfire
    },
    {
      'title': 'instagram',
      'link': 'https://www.instagram.com/jbrialon/'
    },
    {
      'title': 'twitter',
      'link': 'https://twitter.com/jbrialon/'
    }
  ]
}
