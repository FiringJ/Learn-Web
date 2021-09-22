function instanceOf (target, origin) {
  while (target) {
    if (target.__proto__) {
      if (target.__proto__ === origin.prototype) {
        return `${target} is the instance of ${origin}`
      }
      target = target.__proto__
    }
  }
  return false
}

let a = Number(1)
console.log(instanceOf(a, Object))
