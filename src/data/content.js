const url = 'https://www.completementalest.fr'
export default {
  meta: {
    title: 'Complétement à l\'est //',
    author: 'Jérémy Brialon',
    metaImage: `${url}${require('../assets/img/meta_share.gif')}`
  },
  'about': {
    cover: require('../assets/photos/cover.jpg'),
    displayName: 'about',
    text: '↟ Hello my name is Jérémy ↟ <br> ↟ I like going places and take pictures ↟',
    metaImage: `${url}${require('../assets/img/meta_share.gif')}`
  },
  'albums': {
    'malaysia': {
      name: 'malaysia',
      displayName: 'Malaysia',
      cover: require('../assets/photos/malaysia/malaisie-11.jpg'),
      metaImage: `${url}${require('../assets/img/meta_share_malaysia.gif')}`,
      text: '18 days / 17 night, to backpack around Malaysia with <a class="link" href="http://www.voyatopia.com/" target="_blank">voyatopia</a>',
      shuffle: false
    },
    'kilimanjaro': {
      name: 'kilimanjaro',
      displayName: 'Kilimanjaro',
      cover: require('../assets/photos/kilimanjaro/kilimanjaro-25.jpg'),
      metaImage: `${url}${require('../assets/img/meta_share_kilimanjaro.gif')}`,
      text: '6 days / 4 night of trekking in Tanzania to climb mount Kilimanjaro (5985m) by the Machame road',
      shuffle: false
    },
    'islande': {
      name: 'islande',
      displayName: 'Ísland',
      cover: require('../assets/photos/islande/islande-53.jpg'),
      metaImage: `${url}${require('../assets/img/meta_share.gif')}`,
      text: '11 days / 0 night to go around Iceland in 4WD Clio ',
      shuffle: true
    },
    'interlac': {
      name: 'interlac',
      displayName: 'Interlac',
      cover: require('../assets/photos/interlac/interlac-25.jpg'),
      metaImage: `${url}${require('../assets/img/meta_share.gif')}`,
      text: '3 days / 2 nights to connect Lake Annecy to Lake Aix les Bains',
      shuffle: true
    },
    'ardeche': {
      name: 'ardeche',
      displayName: 'Ardèche',
      metaImage: `${url}${require('../assets/img/meta_share.gif')}`,
      cover: require('../assets/photos/ardeche/ardeche-14.jpg'),
      text: 'parce que l\'Ardèche c\'est chouette',
      shuffle: true
    }
  },
  'social': [
    {
      'title': 'mail',
      'link': 'mailto:jeremzor@gmail.com'
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
