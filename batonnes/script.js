// $('document').ready(()=>{


JeuxDesBatons.init()


// })

let rocket = MotionObject.new(document.querySelector('.rocket.r1'), "rocket")
// rocket2 = MotionObject.new(document.querySelector('.rocket.r2'), "rocket2")

let act = target => [rocket].forEach(ele => ele.torpedo(target))

document.querySelectorAll('.click').forEach(x => x.addEventListener('click', e => { act(e.currentTarget) }))