/*
Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

For example, in the claims above, only claim 3 is intact after all claims are made.

What is the ID of the only claim that doesn't overlap?
*/

const input = require('./input')

function parseInput(str) {
  const id = str.split('@')[0].trim()
  const leftOffset = str.split('@')[1]
    .split(',')[0]
  const topOffset = str.split('@')[1]
    .split(',')[1]
    .split(':')[0]
    .trim()
  const width = str.split('@')[1]
    .split(',')[1]
    .split(':')[1]
    .split('x')[0]
    .trim()
  const height = str.split('@')[1]
    .split(',')[1]
    .split(':')[1]
    .split('x')[1]
    .trim()

  return {
    id,
    leftOffset: parseInt(leftOffset),
    topOffset: parseInt(topOffset),
    width: parseInt(width),
    height: parseInt(height)
  }
}

// create a 1000x1000 array and initialize
const matrix = (new Array(1000))

for (let i = 0; i < matrix.length; i++) {
  matrix[i] = (new Array(1000))
  for (let j = 0; j < matrix[i].length; j++) {
    matrix[i][j] = new Array()
  }
}

const canBeLonelyClaims = {}

// fill the matrix with all claims
input.forEach((claim) => {
  const { id, topOffset, leftOffset, height, width } = parseInput(claim)
  let canBeLonely = true

  for (let i = topOffset; i < topOffset + height; i++) {
    for (let j = leftOffset; j < leftOffset + width; j++) {
      matrix[i][j].push(id)

      if (matrix[i][j].length > 1) {
        canBeLonely = false
      }
    }
  }

  // create a small number of claims that can be lonely
  if (canBeLonely) {
    canBeLonelyClaims[id] = {
      id,
      topOffset,
      leftOffset,
      height,
      width
    }
  }
})

// check the lonely claim
let lonelyClaim = null
Object.values(canBeLonelyClaims).forEach((claim) => {
  const { id, topOffset, leftOffset, height, width } = claim
  let isLonely = true
  for (let i = topOffset; i < topOffset + height; i++) {
    for (let j = leftOffset; j < leftOffset + width; j++) {
      if (matrix[i][j].length > 1) {
        isLonely = false
      }
    }
  }

  if (isLonely) {
    lonelyClaim = id
  }
})

console.log(`Lonely claim: ${lonelyClaim}`)
