/*
Time to improve the polymer.

One of the unit types is causing problems; it's preventing the polymer from collapsing as much as it should. Your goal is to figure out which unit type is causing the most problems, remove all instances of it (regardless of polarity), fully react the remaining polymer, and measure its length.

For example, again using the polymer dabAcCaCBAcCcaDA from above:

Removing all A/a units produces dbcCCBcCcD. Fully reacting this polymer produces dbCBcD, which has length 6.
Removing all B/b units produces daAcCaCAcCcaDA. Fully reacting this polymer produces daCAcaDA, which has length 8.
Removing all C/c units produces dabAaBAaDA. Fully reacting this polymer produces daDA, which has length 4.
Removing all D/d units produces abAcCaCBAcCcaA. Fully reacting this polymer produces abCBAc, which has length 6.
In this example, removing all C/c units was best, producing the answer 4.

What is the length of the shortest polymer you can produce by removing all units of exactly one type and fully reacting the result?
*/

const input = require('./input')
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
let stringSize = null
let bestLetter = null

// same as first part
function removeUnits(str) {
  for (let i = 0; i < str.length - 1; i++) {
    const ascii = str[i].charCodeAt()
    const opposite = String.fromCharCode((ascii > 90 ? (ascii - 32) : (ascii + 32)))

    if (opposite === str[i + 1]) {
      const newStr = str.slice(0, i) + str.slice(i + 2)
      return removeUnits(newStr)
    }
  }

  return str
}

alphabet.split('').forEach((letter) => {
  const regex = new RegExp(`[${letter}${letter.toUpperCase()}]`, 'g');
  const newStr = input.replace(regex, '')

  // only check if the letter exists in the string
  if (newStr.length !== input.length) {
    const reducedStr = removeUnits(newStr)

    if (stringSize === null || reducedStr.length < stringSize) {
      stringSize = reducedStr.length
      bestLetter = letter
    }
  }
})

console.log(`Best letter to remove is '${bestLetter}': ${stringSize} characters`)
