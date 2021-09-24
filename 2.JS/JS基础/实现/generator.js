function* idMaker () {
  let index = 0
  while (true) {
    yield index++
  }
}
let gen = idMaker()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
