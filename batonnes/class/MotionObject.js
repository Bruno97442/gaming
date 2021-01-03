/**
 * @start avec la methode new() !!!
 * je veux déplacer les roquettes et pas les batavias
 * récuperer sa position
 * absolute et position fix
 * rotation et alignement vers la cible (calcul ~ cos )
 * transition de position A => B soit la passer la diagonale des axe X et Y
 *      soit poser les points et la transition ?
 *      soit fonction boucles le déplacement ?
 * IN ENGLISH POR FAVOR !!!!!
 */

class MotionObject {

    static _objSet = {}
    static get objSet() {
        return this._objSet
    }
    static setInstance({ HTMLElement, name }) {
        return this._objSet[name] = new MotionObject(HTMLElement, name)
    }

    _HTMLElement

    get HTMLElement() {
        return this._HTMLElement
    }
    set HTMLElement(value) {
        this._HTMLElement = value
    }

    _name
    get name() {
        return this._name
    }
    set name(value) {
        this._name = value
    }


    _pos
    get pos() {
        return this._pos === undefined ? this.HTMLElement.getBoundingClientRect() : this._pos
    }
    set pos(value) {
        this._pos = value == true ? this.HTMLElement.getBoundingClientRect() : value
    }
    _posHome
    get posHome() {
        return this._posHome
    }
    set posHome(value) {
        this._posHome = value
    }


    /**
     * @constructor
     * @param {HTMLElement} HTMLElement 
     */
    constructor(HTMLElement, name) {
        this.name = name
        this.HTMLElement = HTMLElement
        this.HTMLparent = HTMLElement.parentElement
        this.posHome = HTMLElement.getBoundingClientRect()
        this.display = getComputedStyle(HTMLElement).display
    }

    /**
     * compute the rotation: y > 0 ? start at 180deg : 0 &&&&  (x > 0 ? "+" : "-") rotation 
     * tangente tan^-1(oposée / adgacent)
     * HTMLElement become "this"
     * @param {_HTMLElement} target 
     */
    torpedo(target) {
        let s = () => this.HTMLElement.style
        s().transition = '2s ease-in, transform 0.5s ease'
        s().transform = `translate(-50%,-50%) rotate(0deg)`
        s().position = 'absolute'
        this.HTMLElement.setAttribute('name', this.name)
        this.targetDim = target.getBoundingClientRect()
        this.pos = true
        this.posX = Math.floor(this.pos.x + this.HTMLElement.width / 2)
        this.posY = Math.floor(this.pos.y + this.HTMLElement.height / 2)
        s().left = this.pos.x + 'px'
        s().top = this.pos.y + 'px'

        let targetD = this.targetDim,
            targetPosX = Math.floor(targetD.x + targetD.width / 2),
            targetPosY = Math.floor(targetD.y + targetD.height / 2),
            rad = Math.atan2(targetD.x - this.pos.x, targetD.y - this.pos.y),
            rotation = (rad * (180 / Math.PI) * -1) + 180

        this.pos = true
        this.rotate(rotation)
        s().left = Math.floor(targetPosX) + "px"
        s().top = Math.floor(targetPosY) + "px"

        this.HTMLElement.addEventListener('transitionend', MotionObject.explodeAnimate)
    }

    getBackHome() {
        let ele = this.HTMLElement
        ele.style.left = this.posHome.x
        ele.style.top = this.posHome.y
        ele.style.transform = 'none'

        ele.getOffsetWidth
        ele.style.display = this.display
        ele.style.position = 'relative'
    }

    getBack() {
        this.HTMLElement.removeAttribute('style')
        this.HTMLparent.prepend(this.HTMLElement)
    }

    static cpt = 0
    static cptboom = 0
    /**
     * 
     * @param {Event} e 
     */
    static explodeAnimate(e) {
        // comment faire boum !?
        e.stopPropagation()
        if (e.propertyName == "transform" || e.propertyName == "left") {
            MotionObject.boom(this)
        } else {
            this.removeEventListener('transitionend', MotionObject.explodeAnimate)
        }
    }

    /**
     * following element
     * @param {HTMLElement} HTMLElement or rocket in motion where it do twice blow up at the beginning and at the end
     */
    static boom(HTMLElement) {


        let boom = document.createElement('div')
        boom.classList.add('boom')
        boom.name = HTMLElement.getAttribute('name')
        boom.innerText = "BOOM !!"
        boom.style.position = "absolute"
        boom.style.transition = "2s"
        boom.style.opacity = 1
        boom.style.transform = "scale(0.5)"
        boom.style.backgroundImage = "radial-gradient(white, grey)"
        boom.style.padding = "1em"
        boom.style.borderRadius = "40%"
        boom.style.color = "red"
        boom.style.letterSpacing = "3px"
        boom.style.font = "bold 40px/30px Impact, Charcoal, sans-serif"
        document.body.append(boom)
        MotionObject.place(boom, HTMLElement.getBoundingClientRect())

        boom.style.transform = "scale(2)"
        boom.style.opacity = 0
        boom.addEventListener('transitionend', function (e) {
            e.stopPropagation()
            if (e.propertyName !== "transform") {
                MotionObject.place(
                    this,
                    MotionObject.objSet[HTMLElement.getAttribute('name')]
                        ? MotionObject.objSet[HTMLElement.getAttribute('name')].targetDim
                        : HTMLElement.getBoundingClientRect()
                )

                this.remove()
            }
        })
    }

    /**
     * SmokingExplodeElement to replace according the rocket
     * @param {HTMLDivElement} element boom here
     * @param {Function} targetElementDim wait HTMLDivElement.getBoundingClientRect
     */
    static place(element, targetElementDim, hidden = false) {
        if (hidden) {
            element.style.display = "none"
            element.offsetHeight
        }
        element.style.left = targetElementDim.x - Math.floor(targetElementDim.width / 2) + "px"
        element.style.top = targetElementDim.y - Math.floor(targetElementDim.height / 2) + "px"
        hidden ? element.style.display = "block" : null
    }


    rotate(angle) {
        this.HTMLElement.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`
    }

    /**
     * 
     * @param {HTMLElement} HTMLElement element à déplacer
     * @param {*} name 
     */
    static new(HTMLElement, name = "un") {
        return MotionObject.objSet[name] = new MotionObject(HTMLElement, name)
    }
}
