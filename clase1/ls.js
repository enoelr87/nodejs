const fs = require('node:fs')
const fsP = require('node:fs/promises')

fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error', err)
    return
  }

  files.forEach(element => {
    console.log(element)
  })
})

const folder = process.argv[2] ?? '.'
console.info('folder', folder)

fsP.readdir(folder)
  .then(files => {
    files.forEach(element => {
      console.log(element)
    })
  })
  .catch(err => {
    if (err) {
      console.error('Error', err)
    }
  })
