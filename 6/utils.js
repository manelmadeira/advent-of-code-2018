const testInput = [
  [1, 1],
  [1, 6],
  [8, 3],
  [3, 4],
  [5, 5],
  [8, 9]
]

const input = [
  [242, 164],
  [275, 358],
  [244, 318],
  [301, 335],
  [310, 234],
  [159, 270],
  [82, 142],
  [229, 286],
  [339, 256],
  [305, 358],
  [224, 339],
  [266, 253],
  [67, 53],
  [100, 143],
  [64, 294],
  [336, 303],
  [261, 267],
  [202, 86],
  [273, 43],
  [115, 256],
  [78, 356],
  [91, 234],
  [114, 146],
  [114, 260],
  [353, 346],
  [336, 283],
  [312, 341],
  [234, 119],
  [281, 232],
  [65, 203],
  [95, 85],
  [328, 72],
  [285, 279],
  [61, 123],
  [225, 179],
  [97, 140],
  [329, 305],
  [236, 337],
  [277, 110],
  [321, 335],
  [261, 258],
  [304, 190],
  [41, 95],
  [348, 53],
  [226, 298],
  [263, 187],
  [106, 338],
  [166, 169],
  [310, 295],
  [236, 191]
]

const printMatrix = (matrix) => {
  for (let i = 0, len = matrix.length; i < len; i++) {
    let row = ''
    for (let j = 0; j <= matrix[i].length; j++) {
      row += matrix[i][j] || '. '
    }
    console.log(row)
  }
}

const createMatrix = (input) => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const points = {}
  let maxX = 0
  let maxY = 0
  let matrix = null
  let counter = 0

  input.forEach(([y, x]) => {
    maxX = x > maxX ? x : maxX
    maxY = y > maxY ? y : maxY
  })

  matrix = new Array(maxX)
  for (let i = 0, len = maxX + 1; i < len; i++) {
    matrix[i] = new Array(maxY + 1)
  }

  input.forEach(([y, x]) => {
    const key = `${ALPHABET[counter % ALPHABET.length]}${counter}`
    matrix[x][y] = key
    points[key] = [y, x]
    counter +=1
  })

  return { matrix, points }
}

const findNearestPoint = (points, x1, y1) => {
  let best = null
  let bestKey = null
  let counter = 0

  Object.keys(points).forEach((key) => {
    const [y2, x2] = points[key]
    const value = Math.abs(x1 - x2) + Math.abs(y1 - y2)

    if (!best || value < best) {
      best = value
      bestKey = key.toLowerCase()
      counter = 1
    } else if (value === best) {
      counter += 1
    }
  })

  if (counter === 1) {
    return bestKey
  }

  return '. '
}

const calculateTotalDistance = (points, x1, y1) => {
  return Object.keys(points).reduce((acc, key) => {
    const [y2, x2] = points[key]
    return acc + (Math.abs(x1 - x2) + Math.abs(y1 - y2))
  }, 0)
}

module.exports = {
  testInput,
  input,
  printMatrix,
  createMatrix,
  findNearestPoint,
  calculateTotalDistance
}
