const fs = require('fs')

function smallCopy (src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src))
}

function bigCopy(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}

function main (argv) {
  if (argv[2] === 's') {  // 小文件拷贝
    smallCopy(argv[0], argv[1])
  }
  else if (argv[2] === 'b') {
    bigCopy(argv[0], argv[1])
  }
}

main(process.argv.slice(2));
