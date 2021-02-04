class BroFocus {

    static _instances = {}
    static get instances() {
        return this._instances
    }
    static ins(instance) {
        return this._instances[instance]
    }
    static setInstance({ HTMLElement, name }) {
        return this._instances[name] = new BroFocus(HTMLElement, name)
    }

    focusSignSet = []
    sound = { state: 'yes', shoot: null }

    /**
     * 
     * @param {HTMLElement} plateform 
     */
    constructor(plateform, name) {
        if (typeof plateform !== undefined) {
            this.plateform = plateform
        }
        this.focusSign
        this.name = name
        this.sound.shoot = new Audio('sound/tire.mp3')
        this.sound.shoot.volume = 0.2

    }
    // design staff


    // mouse functions
    plateformeFocus() {
        let instance = this
        this.createFocus()
        this.plateform.addEventListener('mouseover', instance.startInDocFocus)
        this.plateform.addEventListener('mouseenter', instance.appendFocus)
        this.plateform.addEventListener('mousemove', instance.superCurser)
        this.plateform.addEventListener('click', instance.clickFocus)
        this.plateform.addEventListener('mouseleave', instance.destroyFocus)
    }

    startInDocFocus() {
        let mf = BroFocus.ins('mouseFocus')
        if (!mf.focusSign.parentElement) {
            mf.createFocus()
            mf.appendFocus()
        }
        mf.plateform.removeEventListener('mouseover', mf.startInDocFocus)
    }
    createFocus(classList = 'focus focus-comeIn', rotateRandom = false) {
        let f = this.create(classList)
        this.focusSign = f
        const spanL = `<span></span><span></span><span></span><span></span>`
        f = this.focusSign
        if (rotateRandom) f.style.transform = `translate(-50%, -50%) rotate(${Math.floor(Math.random() * 360)}deg)`
        f.innerHTML = spanL
        // this.focusSignSet.push(f)
        return f
    }
    appendFocus() {
        let mf = BroFocus.ins('mouseFocus')
        mf.plateform.append(mf.focusSign)
        mf.plateform.style.cursor = 'none'
    }

    clickFocus(e) {
        let { focusSign, sound, projectileLife } = BroFocus.ins('mouseFocus')
        focusSign.classList.add("active")
        projectileLife(e)
        sound.shoot ? sound.shoot.cloneNode().play() : null
        setTimeout(() => {
            focusSign.classList.remove("active")
        }, 300);
    }

    /**
     * Crée un Dom element
     * @param {string} className 
     * @param {string} type d'element
     * @returns {HTMLElement}
     */
    create(className, type = 'div') {
        let ele = document.createElement(type)
        ele.className = className
        return ele
    }

    /**
     * 
     * @param {Event} position 
     * @param {number} time en second de la durée d'animation
     * @param {string} className 
     */
    projectileLife(position, time = 1, className = 'bullet fadeOut') {
        let mouseFocus = BroFocus.ins('mouseFocus')
        let b = mouseFocus.create(className),
            s = (style, value) => b.style[style] = value,
            { pageX, pageY } = position,
            f = nb => Math.floor(nb)
        s('left', f(pageX) + 'px')
        s('top', f(pageY) - 3 + 'px')
        b.innerHTML =
            `<main class="body">
                <section class="bottom">
                    <div class="speedEffect e1"></div>
                    <div class="speedEffect e2"></div>
                    <div class="speedEffect e3"></div>
                </section>
            </main>`
        mouseFocus.plateform.append(b)

        b.addEventListener('animationend', function () { this.remove() })


    }

    destroyFocus() {
        BroFocus.ins('mouseFocus').focusSign.remove()
    }
    superCurser(e) {
        // e.stopPropagation()
        BroFocus.ins('mouseFocus').focusSign.setAttribute('style', `left: ${e.clientX}px; top: ${e.clientY}px;`)

    }
}
