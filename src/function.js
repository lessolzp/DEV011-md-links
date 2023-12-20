//lets get the path we've got from mdLinks
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises;
const markdownIt = require('markdown-it');
const axios = require('axios');

// function to valid if the path is absolute
const isAbsolutePath = (route) => path.isAbsolute(route)


//function to valid if the path exists and return an absolute path
const absPathExists = (route) => {
  if (fs.existsSync(route)) {
    return isAbsolutePath(route) ? route : path.resolve(route)
  } else {
    throw new Error('The file does not exists')
  }
}

// function to validate the path's extension is a md the given route should be absolute
const validateExtension = (route) => {
  const validExt = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  if (validExt.includes(path.extname(route))) {
    return route
  } else {
    throw new Error('Invalid file extension')
  }
}
//function to validate the path and be ready to be read
const validatePath = (route) => {
  try {
    const validatedRoute = validateExtension(absPathExists(route))
    return validatedRoute
  } catch (error) {
    throw new Error(error.message)
  }
}
//function to read the file
const findLinks = (route) => {
  return fsPromises.readFile(route, 'utf-8')
  .then(pathContent => {
    const md = new markdownIt();
    const objects = md.parse(pathContent, {});
    const links = [];
    //const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/; 
    const linkRegex = /\[([^\]]+)\]\((https:\/\/[^)]+)\)/g;
    objects.forEach(object => {
      if (object.type === 'inline' && object.children) {
        //console.log(object)
        object.children.forEach(child => {
          if (child.type === 'link_open') {
            //console.log(child)
            const match = linkRegex.exec(object.content)
            if (match) {
              const href = match[2]
              const text = match[1]
              const file = path.relative(process.cwd(), route)
              //const formattedLink = `${file} ${href} ${text}`;
              links.push({href, text, file})
            }
          }
        })
      }
    })
      return links
  })
  .catch(error => {
    throw new Error('No such file or directory')
  })
}

//function to validate paths
const validateLinks = (link) => {
  return axios.get(link.href)
  .then((response) => {
    return { ...link, status: response.status, message: response.statusText }
  })
  .catch((error) => {
    return { ...link, status: error.response ? error.response.status : undefined, message: 'FAIL' }
  })
}


//function to compute statistics about the links
const linkStats = (links) => {
  const totalLinks = links.length;
  const uniqueLinks = [...new Set(links.map(link => link.href))];
  const totalUniqueLinks = uniqueLinks.length;
  /*let stats = [
    `Total: ${totalLinks}`,
    `Unique: ${totalUniqueLinks}`,
  ];*/
  let stats = [totalLinks, totalUniqueLinks]
  return stats
}
const validatedLinkStats = (links) => {
  const totalLinks = links.length;
  const uniqueLinks = [...new Set(links.map(link => link.href))]; 
  const totalUniqueLinks = uniqueLinks.length;
  const totalOk = links.filter(link => link.message === 'OK').length; 
  const totalFail = totalLinks - totalOk;
  /*let stats = [
    `Total: ${totalLinks}`,
    `Unique: ${totalUniqueLinks}`,
    `Ok: ${totalOk}`,
    `Fail: ${totalFail}`,
  ]*/
  let stats = [totalLinks, totalUniqueLinks, totalOk, totalFail]
return stats
}
/*link = {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'README.md',
  }
validateLinks(link)
  .then((result) => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  })*/

module.exports = {
    isAbsolutePath, absPathExists, validateExtension, validatePath, findLinks, validateLinks, linkStats, validatedLinkStats
  };
