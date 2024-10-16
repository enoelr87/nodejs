const path = require('node:path')

console.log(path.sep)

const filePath = path.join('content', 'folder', 'test.txt')
console.log(filePath)

const fileBase = path.basename('/content/folder/test.txt')
console.log(fileBase)

const fileName = path.basename('/content/folder/test.txt', '.txt')
console.log(fileName)

const ext = path.extname('text.txt')
console.log(ext)
