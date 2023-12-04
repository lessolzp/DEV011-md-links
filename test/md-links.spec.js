const { mdLinks } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/index.js');
const path = require('path')

describe('mdLinks', () => {
  test('Should return an array with 76 objects each one with the link info extracted from a file which contains 76 number of links in it ', () => {
    const mdPath = 'README.md'
    return mdLinks(mdPath).then((links)=> {
      expect(links).toHaveLength(76)
    })
  });
  /*test('Should return an empty array from a file that does not have links in it', () => {
    const mdPath = 'docs/nolinksfile.md'
    return findLinks(mdPath).then((links)=> {
      expect(links).toHaveLength(0)
    })
  });*/
  test('Should throw an array with an object with the link found from a given MarkDown path', () => {
    const mdPath = 'docs/01-milestone.md'
    return mdLinks(mdPath).then((links)=> {
      expect(links).toEqual([{"file": "/Users/leslie/Laboratoria/DEV011-md-links/docs/01-milestone.md", "href": "../README.md#6-hitos", "text": "👈Todos los hitos"}])
    })
  });
  /*test('Should throw an error for a non existing MarkDown path', () => {
    const testPath = '/Users/leslie/Laboratoria/DEV011-md-links/docs/06-milestone.md'
    return expect(findLinks(testPath)).rejects.toThrowError('No such file or directory')
  });*/
});
