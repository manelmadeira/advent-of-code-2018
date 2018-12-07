const values = require('./input')

const result = values.reduce((acc, value) => acc + value, 0)
console.log(`Frequency: ${result}`)
