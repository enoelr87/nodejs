const os = require('node:os')

console.info(os.platform(), os.release(), os.arch(), os.cpus())
console.info(os.freemem() / 1024 / 1024)
console.info(os.totalmem() / 1024 / 1024)
console.info('uptime', os.uptime() / 60 / 60)
