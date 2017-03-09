var netlify = require("netlify");
var config = require('../config/netlify')
var fs = require('fs');

fs.createReadStream('config/_redirects').pipe(fs.createWriteStream('dist/_redirects'));

netlify.deploy(config).then(function (deploy) {
  console.log('New deploy is live')
})
