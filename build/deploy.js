var ghpages = require('gh-pages')
var path = require('path')
var fs = require('fs');

fs.createReadStream('config/_redirects').pipe(fs.createWriteStream('dist/_redirects'));

ghpages.publish(path.join(__dirname, '../dist'), function (err) {
  if (err) console.error(err)
  console.log('New deploy is live')
})
