import { ComputeAmount, calculator } from "./src/challenges/method-chaining.js"

import { flatArray } from "./src/polyfills/arrayPolyFill.js";
import { deepCopy } from "./src/polyfills/flattenObject.js";
import { memoProduct, memoizedFibonacci, increment } from "./src/polyfills/memoizedFunc.js";
import { add } from "./src/js-snippets/predictOp.js";

const nestedArr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

const response = {
  name: 'Manu',
  age: 21,
  characteristics: {
    height: '6 feet',
    complexion: 'dark',
    hair: 'black',
  },
  favouriteMovie: ['Arrow', 'Flash', 'Prison Break'],
  techStack: {
    language: 'Javascript',
    framework: {
      name: 'Nextjs',
      version: '12',
    },
  },
};

const player = {
  "player_name": "John Doe",
  "career_stats": {
    "matches_played": 200,
    "runs_scored": 10000,
    "highest_score": 300,
    "average": 50.0,
    "strike_rate": 80.0,
    "centuries": 30,
    "half_centuries": 40,
    "catches": 50,
    "stumpings": 10
  },
  "match_stats": {
    "opposition": "Australia",
    "runs_scored": 100,
    "balls_faced": 120,
    "fours": 10,
    "sixes": 5,
    "catches": 1,
    "stumpings": 0
  }
}

console.log(memoizedFibonacci(70) )

increment()
increment()
increment()
increment()
increment()
increment()