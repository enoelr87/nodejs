const fs = require('node:fs')
const fsPromise = require('node:fs/promises')

const stats = fs.statSync('./file.txt')
console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)

console.log('1er')
fsPromise.readFile('./file.txt', 'utf-8').then((text) => {
  console.log(text)
})

console.log('here')

console.log('2do')
fs.readFile('./file2.txt', 'utf-8', (err, text) => {
  console.log(err, text)
})

// Promise.all([
//     fsPromise.readFile('.file.txt', 'utf-8'),
//     fsPromise.readFile('.file2.txt', 'utf-8')
// ]).then(([text1, text2]) => {
//     console.log('1', text1)
//     console.log('2', text2)
// })
