/*
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
*/

const input = require('./input')

for (let x = 0; x < input.length; x++) {
  const str1 = input[x]

  for (let y = x; y < input.length; y++) {
    const str2 = input[y]

    let counter = 0
    let commonString = ''
    // compare each character and adds to a temporary string if they are equal
    for (let i = 0, len = str1.length; i < len; i++) {
      if (str1[i] !== str2[i]) {
        counter += 1
      } else {
        commonString += str1[i]
      }
    }

    if (counter === 1) {
      console.log(`String 1: ${str1}`)
      console.log(`String 2: ${str2}`)
      console.log(`Common string: ${commonString}`)
      return;
    }
  }
}



console.log((counter >= 1) ? 'not valid' : commonString)
