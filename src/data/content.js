const url = 'https://www.completementalest.fr'
export default {
  meta: {
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
  'albums': {
    'malaysia': {
      name: 'malaysia',
      displayName: 'Malaysia',
      cover: require('../assets/photos/malaysia/malaisie-11.jpg'),
      text: '18 days / 17 night, to backpack around Malaysia with <a class="link" href="http://www.voyatopia.com/" target="_blank">voyatopia</a>',
      shuffle: false,
      meta: [
        { name: 'og:url', content: `${url}/album/malaysia` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share_malaysia.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share_malaysia.gif')}` }
      ]
    },
    'kilimanjaro': {
      name: 'kilimanjaro',
      displayName: 'Kilimanjaro',
      cover: require('../assets/photos/kilimanjaro/kilimanjaro-25.jpg'),
      text: '6 days / 4 night of trekking in Tanzania to climb mount Kilimanjaro (5985m) by the Machame road',
      shuffle: false,
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
      meta: [
        { name: 'og:url', content: `${url}/album/islande` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share.gif')}` }
      ]
    },
    'interlac': {
      name: 'interlac',
      displayName: 'Interlac',
      cover: require('../assets/photos/interlac/interlac-25.jpg'),
      text: '3 days / 2 nights to connect Lake Annecy to Lake Aix les Bains',
      shuffle: true,
      meta: [
        { name: 'og:url', content: `${url}/album/interlac` }, // TODO: should be dynamic
        { name: 'og:image', content: `${url}${require('../assets/img/meta_share.gif')}` },
        { name: 'twitter:image', content: `${url}${require('../assets/img/meta_share.gif')}` }
      ]
    },
    'ardeche': {
      name: 'ardeche',
      displayName: 'Ardèche',
      metaImage: `${url}${require('../assets/img/meta_share.gif')}`,
      text: 'parce que l\'Ardèche c\'est chouette',
      shuffle: true,
      meta: [
        { name: 'og:url', content: `${url}/album/ardeche` }, // TODO: should be dynamic
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
      'title': 'facebook',
      'link': 'https://www.facebook.com/jbrialon'
    },
    {
      'title': 'instagram',
      'link': 'https://www.instagram.com/jbrialon_/'
    },
    {
      'title': 'vimeo',
      'link': 'https://vimeo.com/jbrialon'
    }
  ]
}
