// Let's bring the mdLinks function to show it on terminal
const { mdLinks } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/index.js');

//const path = process.argv[2]

mdLinks('docs/02-milestone.md')
.then(links => console.log('Links found in the file: ', links))
.catch(err => console.log('Error:', err.message))