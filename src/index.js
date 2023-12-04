const { validatePath, findLinks } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/function.js')

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    const validatedPath = validatePath(path)
    findLinks(validatedPath)
    .then(links=> {
      resolve(links)
    })
    .catch(error => {
      reject(error)
    })
  })
}
/*mdLinks('docs/02-milestone.md')
.then(links=> {
  console.log('Links found in the file: ', links)
})
.catch(error => {
  console.log(error)
})*/


module.exports = {
  mdLinks
};
