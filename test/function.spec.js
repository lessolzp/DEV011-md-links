const { isAbsolutePath, absPathExists, validateExtension, validatePath, findLinks, validateLinks, linkStats, validatedLinkStats } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/function.js')
const path = require('path')
const axios = require ('axios');

describe('isAbsolutePath', () => {
    const relPath = 'docs/05-milestone.md'
    const testedPath = isAbsolutePath(relPath)

  it('should receive a relative path and return false', () => {
    expect(testedPath).toEqual(false)
  });
});
describe('isAbsolutePath', () => {
    const absPath = '/Users/leslie/Laboratoria/DEV011-md-links/docs/04-milestone.md'
    const testedPath = isAbsolutePath(absPath)

  it('should receive an absolute path and return true', () => {
    expect(testedPath).toEqual(true)
  });
});
describe('absPathExists', () => {
  test('Should return an absolute path for an existing relative given path', () => {
    const existingRelativePath = 'docs/05-milestone.md'
    const expectedAbsolutePath = path.resolve(existingRelativePath)
    expect(absPathExists(existingRelativePath)).toBe(expectedAbsolutePath)
  });
  test('Should throw an error for a non existing path', () => {
    const nonexistingPath = 'docs/06-milestone.md'
    try {
        absPathExists(nonexistingPath);
        fail('Expected absPathExists to throw an error for a non-existing path');
      } catch (error) {
        expect(error.message).toBe('The file does not exists');
      }
  });
});
describe('validateExtension', () => {
    test('Should return the same absolute path for a valid MarkDown file path', () => {
      const mdPath = '/Users/leslie/Laboratoria/DEV011-md-links/docs/05-milestone.md'
      expect(validateExtension(mdPath)).toBe('/Users/leslie/Laboratoria/DEV011-md-links/docs/05-milestone.md')
    });
    test('Should throw an error for a non MarkDown path', () => {
      const nonMdPath = '/Users/leslie/Laboratoria/DEV011-md-links/src/index.js'
      try {
        validateExtension(nonMdPath)
          fail('Expected validateExtensions to throw an error for a non-valid Markdown extension');
        } catch (error) {
          expect(error.message).toBe('Invalid file extension');
        }
    });
  });
  describe('validatePath', () => {
    test('Should return an absolute existing path with a valid Markdown extension ', () => {
      const mdPath = 'docs/01-milestone.md'
      expect(validatePath(mdPath)).toBe('/Users/leslie/Laboratoria/DEV011-md-links/docs/01-milestone.md')
    });
    test('Should throw error "Invalid file extension" for a non MarkDown path', () => {
      const nonMdPath = '/Users/leslie/Laboratoria/DEV011-md-links/src/index.js'
      try {
        validatePath(nonMdPath)
          fail('Expected validatePath to throw an error for a non-valid Markdown extension');
        } catch (error) {
          expect(error.message).toBe('Invalid file extension');
        }
    });
    test('Should throw error "The file does not exists" for a non existing MarkDown path', () => {
      const nonMdPath = '/Users/leslie/Laboratoria/DEV011-md-links/docs/06-milestone.md'
      try {
        validatePath(nonMdPath)
          fail('Expected validatePath to throw an error for a non existing Markdown path');
        } catch (error) {
          expect(error.message).toBe('The file does not exists');
        }
    });
  });
  describe('findLinks', () => {
    test('Should return an array with 34 objects each one with the link info extracted from a file which contains 76 number of links in it ', () => {
      const mdPath = 'README.md'
      return findLinks(mdPath).then((links)=> {
        expect(links).toHaveLength(34)
      })
    });
    test('Should return an empty array from a file that does not have links in it', () => {
      const mdPath = 'docs/nolinksfile.md'
      return findLinks(mdPath).then((links)=> {
        expect(links).toHaveLength(0)
      })
    });
    test('Should throw an error for a non existing MarkDown path', () => {
      const testPath = '/Users/leslie/Laboratoria/DEV011-md-links/docs/06-milestone.md'
      return expect(findLinks(testPath)).rejects.toThrowError('No such file or directory')
    });
  });
  describe('validateLinks', () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      statusText: 'OK', 
    });
    const testLink = {
        href: 'https://github.com/Laboratoria/curriculum-parser',
        text: 'Una guía para crear un paquete de línea de comandos NodeJS - medium.com',
        file: '/Users/leslie/Laboratoria/DEV011-md-links/README.md'
    }
      testHref = 'https://github.com/Laboratoria/curriculum-parser'
      const response = {
        href: 'https://github.com/Laboratoria/curriculum-parser',
        text: 'Una guía para crear un paquete de línea de comandos NodeJS - medium.com',
        file: '/Users/leslie/Laboratoria/DEV011-md-links/README.md',
        status: 200,
        message: 'OK'
      };
      const brokenLink = {
        href: 'https://nodejs.org/es/about/',
        text: 'Acerca de Node.js - Documentación oficial',
        file: '/Users/leslie/Laboratoria/DEV011-md-links/README.md'
      }
      test(`Should call axios.get with the link href`, () => {
      const axiosSpyGet = jest.spyOn(axios, 'get');
        return validateLinks(testLink).then((result)=> {
        expect(axiosSpyGet).toHaveBeenCalledWith(testHref)
        expect(result.status).toEqual(response.status)
        })
      });
        test('Should return the same link with 2 more properties', () => {
          //const axiosSpyGet = jest.spyOn(axios, 'get');
          return validateLinks(testLink).then((result)=> {
            expect(result).toMatchObject(response)
          })
        })
  });
  describe('linkStats', () => {
    test('Should return an array with the test array stats info ', () => {
      const testArray = [
        {
      href: 'https://www.npmjs.com/package/jsdom',
      text: 'JSDOM',
      file: 'README.md'
        },
        {
      href: 'https://cheerio.js.org/',
      text: 'Cheerio',
      file: 'README.md'
        },
        {
      href: 'https://github.com/Laboratoria/curriculum-parser',
      text: '`curriculum-parser`',
      file: 'README.md'
        }
      ]
      const result = [ 'Total: 3', 'Unique: 3' ]
    expect(linkStats(testArray)).toEqual([3,3])
    });
    describe('validatedLinkStats', () => {
      test('Should return an array with the test array stats info ', () => {
        const testArray = [{
          href: 'https://cheerio.js.org/',
          text: 'Cheerio',
          file: 'README.md',
          status: 200,
          message: 'OK'
        },
        {
          href: 'https://github.com/Laboratoria/curriculum-parser',
          text: '`curriculum-parser`',
          file: 'README.md',
          status: 200,
          message: 'OK'
        }]
        const result = [ 'Total: 2', 'Unique: 2', 'Ok: 2', 'Fail: 0' ]
      expect(validatedLinkStats(testArray)).toEqual([2,2,2,0])
      });
    });
    });