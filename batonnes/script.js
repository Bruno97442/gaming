// $('document').ready(()=>{


JeuxDesBatons.init()


// })

// let rocket = MotionObject.new(document.querySelector('.rocket.r1'), "rocket")
// rocket2 = MotionObject.new(document.querySelector('.rocket.r2'), "rocket2")

// let act = target => [rocket].forEach(ele => ele.torpedo(target))

// document.querySelectorAll('.click').forEach(x => x.addEventListener('click', e => { act(e.currentTarget) }))

GameAnimate.instance = document.querySelector('.batonnee')
let test = GameAnimate.instance
console.log(test)
test.plateformeFocus()




// function shuffle(array) {
//     var m = array.length, t, i;
  
//     // While there remain elements to shuffle…
//     while (m) {
  
//       // Pick a remaining element…
//       i = Math.floor(Math.random() * m--);
  
//       // And swap it with the current element.
//       t = array[m];
//       array[m] = array[i];
//       array[i] = t;
//     }
  
//     return array;
//   }