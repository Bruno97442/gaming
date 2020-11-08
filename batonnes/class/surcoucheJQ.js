/**
 * 
 * @param {any} dom référence DOM
 * @param {string} action action Jquery
 */
let b = function (dom, Jquery = 1) {


    return Jquery ? $(dom) : document.querySelectorAll(dom)
    // return function (inside = null) {$(dom)[action](inside)}
}


let cl = variable => console.trace(variable)


/**
 * bouger les yeux du robot
 */
let eyes = document.querySelectorAll(".retina")
// let followingEye = () => {
// window.addEventListener('mousemove', e => {
// console.log(Math.floor((e.clientX / window.innerWidth) * 60 + 20))
//     eyes.forEach(eye => {

//         eye.style.left = `${Math.floor((e.clientX / window.innerWidth) * 60 + 20)}%`
//         eye.style.top = `${Math.floor((e.clientY / window.innerHeight) * 60 + 20)}%`
//     })
// });
// window.addEventListener('click', e =>{
//     console.log(e)
//         let l = document.createElement('span')
//         l.style.backgroundColor = "red"
//         l.innerHTML = "laser"
//         l.style.transition = "1s easy"
//         l.style.position = "absolute"
//         l.style.transform = "translate(-50%, -50%)"
//         document.body.appendChild(l)
//         l.style.left = eyes[0].getBoundingClientRect().x + "px"
//         l.style.top = eyes[0].getBoundingClientRect().y + "px"
//         l.offsetHeight

// l.style.left = e.clientX + "px"
// l.style.top = e.clientY + "px"
// })
// }

