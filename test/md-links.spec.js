const { mdLinks } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/index.js');
const { validatePath, findLinks, validateLinks, linkStats, validatedLinkStats } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/function.js')
const path = require('path')

jest.mock('/Users/leslie/Laboratoria/DEV011-md-links/src/function.js', () => ({
  validatePath: jest.fn(),
  findLinks: jest.fn(),
  validateLinks: jest.fn(),
  linkStats: jest.fn(),
  validatedLinkStats: jest.fn(),
}));

describe('mdLinks', () => {
  test('Should return an array with total: 34 Unique:34 for a file with 34 different links', () => {
    const mockPath = 'README.md'
    const mockLinks = [
      { file: 'README.md', href: 'https://medium.com/noders/t%C3%BA-yo-y-package-json-9553929fb2e3', text: 'Tú, yo y package.json' },
      { file: 'README.md', href: 'https://nodejs.org/api/path.html', text: 'Node.js path - Documentación oficial' },
    ];
    const mockValStats = [2,2,2,0]
    validatePath.mockReturnValue(mockPath);
    findLinks.mockResolvedValue(mockLinks);
    validateLinks.mockImplementation(link => ({ ...link, status: '200', message: 'OK' }));
    validatedLinkStats.mockReturnValue(mockValStats);
    return mdLinks(mockPath, { stats: true, validate: true }).then((result)=> {
      expect(result).toEqual([2,2,2,0])
    })
  })
});
