//lets get the path we've got from mdLinks
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises;
const markdownIt = require('markdown-it');

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
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/; 
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
              const file = route
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


module.exports = {
    isAbsolutePath, absPathExists, validateExtension, validatePath, findLinks
  };
