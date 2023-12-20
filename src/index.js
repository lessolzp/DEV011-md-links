//const chalk = require('chalk');
const { validatePath, findLinks, validateLinks, linkStats, validatedLinkStats } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/function.js')

function mdLinks(path, options ={}) {
  return new Promise((resolve, reject) => {
    const validatedPath = validatePath(path)
    findLinks(validatedPath)
    .then(links => {
      if(options.validate) {
        const validatedArray = links.map((link)=> validateLinks(link))
        return Promise.all(validatedArray)
      } else {
        return links
      }
    })
    .then(result => {
      if (options.stats){
        let stats = linkStats(result);
        if (options.validate) {
          stats = validatedLinkStats(result)
          }
          resolve(stats);
      } else {
        resolve(result)
      }
    })
    .catch(error => {
      reject(error)
    })
  })
}


module.exports = {
  mdLinks
};
