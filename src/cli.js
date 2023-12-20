#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('/Users/leslie/Laboratoria/DEV011-md-links/src/index.js');


const [path, ...options] = process.argv.slice(2);
const validateOption = options.includes('--validate');
const statsOption = options.includes('--stats');

mdLinks(path, { validate: validateOption, stats: statsOption })
.then((links) => { 
let output ='';

if (validateOption) {
    if (statsOption){
        output += chalk.yellow(`Total: ${links[0]} `)
        output += chalk.cyanBright(`Unique: ${links[1]} `)
        output += chalk.green(`Ok: ${links[2]} `)
        output += chalk.red(`Fail: ${links[3]} `)
    } else {
        links.forEach((link) => {
            const statusColor = link.status === 200 ? chalk.green : chalk.red;
            output += `${link.file}  `
            output += chalk.cyanBright(`href: ${link.href}  `)
            output += statusColor(`status: ${link.status} ${link.message}  `)
            output += `text: ${link.text}\n`
            })
    }
} else {
    if (statsOption){
        output += chalk.yellow(`Total: ${links[0]}  `)
        output += `Unique: ${links[1]}`
    } else {
        links.forEach((link) => {
            output += `${link.file}  `
            output += chalk.yellow(`href: ${link.href}  `)
            output += `text: ${link.text}\n`
            })
    
    }
}
console.log(output)
})

.catch(err => console.log('Error:', err.message))
