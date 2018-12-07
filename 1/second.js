const values = require('./input')

const repeat = {}
let repeated = null
let counter = 0
while (repeated === null) {
  counter = values.reduce((acc, val) => {
    if (repeat[acc] === 1 && repeated === null) {
      repeated = acc
    }

    repeat[acc] = (repeat[acc] || 0) + 1
    return acc + val
  }, counter)
}

console.log(`Repeated sequence: ${repeated}`)
