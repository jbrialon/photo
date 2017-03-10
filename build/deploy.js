var fs = require('fs');
console.log('Copy _redirects file');

fs.createReadStream('config/_redirects').pipe(fs.createWriteStream('dist/_redirects'));

console.log('New deploy is live');
