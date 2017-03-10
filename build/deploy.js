var fs = require('fs');

fs.createReadStream('config/_redirects').pipe(fs.createWriteStream('dist/_redirects'));

console.log('New deploy is live');
