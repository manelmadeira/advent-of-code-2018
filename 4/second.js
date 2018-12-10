/*
Strategy 2: Of all guards, which guard is most frequently asleep on the same minute?

In the example above, Guard #99 spent minute 45 asleep more than any other guard or minute - three times in total. (In all other cases, any guard spent any minute asleep at most twice.)

What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 99 * 45 = 4455.)
*/
const input = require('./input')
const orderedInput = input.input.sort()

const guards = {
  // map
  // last start
}

let lastId = null
orderedInput.forEach((log) => {
  const { action, id = lastId, minute } = input.parse(log)

  if (action === 'begin') {
    lastId = id

    // initialize guard record
    if (!guards[id]) {
      guards[id] = {
        id,
        map: new Array(59)
      }
    }
  }

  if (action === 'asleep') {
    guards[id].asleep = minute
  }

  if (action === 'awake') {
    for (let i = guards[id].asleep; i < minute; i++) {
      if (!guards[id].map[i]) {
        guards[id].map[i] = ['X']
      } else {
        guards[id].map[i].push('X')
      }
    }
  }
})

const greatestSleeper = {
  id: null,
  minute: 0,
  times: 0
}

Object.values(guards).forEach(({ map, id }) => {
  let tempMinute = 0
  let tempTimes = 0

  for (let i = 0; i < map.length; i++) {
    if (map[i] && map[i].length > tempTimes) {
      tempTimes = map[i].length
      tempMinute = i
    }
  }

  if (tempTimes > greatestSleeper.times) {
    greatestSleeper.id = id
    greatestSleeper.times = tempTimes
    greatestSleeper.minute = tempMinute
  }
})

console.log(`The guard most time sleeping in the same minute (${greatestSleeper.minute}) is #${greatestSleeper.id}`)
console.log(`Result: ${greatestSleeper.id * greatestSleeper.minute}`)
