const path = require('path')
const fs = require('fs')

let file = path.join(__dirname, 'template', 'loader.html')
console.log('file:', file)
/* let content = fs.readFileSync(file).toString()
console.log(content) */

fs.readFile(file, 'utf8', (err, data) => {
  console.log(err || data)
})
