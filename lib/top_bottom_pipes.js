const Obstacle = require ('./Obstacle.js')
const ObstacleUpper = require ('./ObstacleUpper.js')

let obstacleArray = [];
let obstacleBelowArray = [];
let obstacleAboveArray = [];
var NewObstacleXLocation = 500



// upper Obstacles Randomizing
function generateFirstXLocationBothTubes(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(400) - parseInt(150)) + parseInt(150))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle, 75, 800))
  obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
}

function generateOtherXLocationsBothTubes(min, max) {
  NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
  let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(400) - parseInt(150)) + parseInt(150))));

  obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightUpperObstacle, 75, 800))
  obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
}

function randomTopAndBottomTubeGenerate () {
  for (var i = 0; i < 10; i++) {
      generateFirstXLocationBothTubes ((NewObstacleXLocation + 300), (NewObstacleXLocation + 400))
      generateOtherXLocationsBothTubes(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
    }
  }
}


// // lower Obstacle Randomizing
// function generateFirstXLocationLowerObstacle(min, max) {
//   NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
//   let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(300) - parseInt(150)) + parseInt(150))));
//
//   obstacleArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 50, 800))
//   obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800))
//   console.log(NewObstacleXLocation);
// }
//
// function generateOtherXLocationsLowerObstacle(min, max) {
//   NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
//   let NewObstacleHeightLowerObstacle = (Math.round((Math.random() * (parseInt(200) - parseInt(100)) + parseInt(100))));
//
//   obstacleBelowArray.push (new Obstacle (NewObstacleXLocation, NewObstacleHeightLowerObstacle, 75, 800))
//   // console.log(NewObstacleHeightLowerObstacle);
// }
//
// function firstRandomXAndHeightGenerationLowerObstacle () {
//   let lowerOrUpper = (Math.round((Math.random() * (parseInt(1)) + parseInt(1))));
//
//   if (lowerOrUpper === 1) {
//     generateFirstXLocationLowerObstacle ((NewObstacleXLocation - 20), NewObstacleXLocation)
//     console.log (obstacleBelowArray);
//   } else if (lowerOrUpper === 2) {
//     generateFirstXLocationUpperObstacle((NewObstacleXLocation - 20), NewObstacleXLocation)
//     console.log(obstacleAboveArray)
//   }
// }
//
//
// function randomXAndHeightGenerationLowerObstacle () {
//   for (var i = 0; i < 40; i++) {
//     let lowerOrUpper = (Math.round((Math.random() * (parseInt(1)) + parseInt(1))));
//
//     if (lowerOrUpper === 1) {
//       generateOtherXLocationsLowerObstacle ((NewObstacleXLocation + 300), (NewObstacleXLocation + 400))
//           // console.log(obstacleBelowArray);
//     } else if (lowerOrUpper === 2) {
//       generateOtherXLocationsUpperObstacle(NewObstacleXLocation + 300, NewObstacleXLocation + 400)
//     }
//   }
// }
//
//     // upper Obstacles Randomizing
// function generateFirstXLocationUpperObstacle(min, max) {
//   NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
//   let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(400) - parseInt(150)) + parseInt(150))));
//
//   obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
// }
//
// function generateOtherXLocationsUpperObstacle(min, max) {
//   NewObstacleXLocation = (Math.round((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min))));
//   let NewObstacleHeightUpperObstacle = (Math.round((Math.random() * (parseInt(400) - parseInt(150)) + parseInt(150))));
//
//   obstacleAboveArray.push (new ObstacleUpper (NewObstacleXLocation, NewObstacleHeightUpperObstacle - 800, 75, NewObstacleHeightUpperObstacle))
// }

      //   function randomXAndHeightGenerationUpperObstacle (){
      //     // generateFirstXLocationUpperObstacle((NewObstacleXLocation-20), NewObstacleXLocation)
      //     for (var i = 0; i < 9; i++) {
      //       generateOtherXLocationsUpperObstacle ((NewObstacleXLocation+300), (NewObstacleXLocation+400))
      //     }
      // }

firstRandomXAndHeightGenerationLowerObstacle ()
randomXAndHeightGenerationLowerObstacle ()
