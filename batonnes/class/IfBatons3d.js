class IfBatons3d {

    static instance = null
    _nombre
    get nombre() {
        return this._nombre
    }
    set nombre(value) {
        this._nombre = value
    }
    _pioche = []
    get pioche() {
        return this._pioche
    }
    set pioche(value) {
        this._pioche = value
    }
    dom
    _3d
    instanceJeux

    /**
     * @param {Object} param0 
     * @param {String} param0._plateforme querySelector
     * @param {Number} param0._nombre de bâtons
     * @param {Array} param0._pioche 
     * @param {Array} param0._3d 
     */
    constructor({ _plateforme = ".plateforme", _nombre, _pioche = [1, 2, 4], _3d = true } = {}) {

        this.plateforme = _plateforme
        this.pioche = _pioche
        this.nombre = _nombre
        this._3d = _3d
        this.style = {}
        this.dom = []

        this.premierAffiche = true
        this.uneFoisTour = false


    }

    baton = classUniq => `<div class="baton b${classUniq}" style="background-color: black"></div>`

    surfaces(nb) {
        let plats = 2,
            surface3d = `
            `
        for (let i = 0; i < nb + plats; i++) {
            surface3d += `<div class="surface"></div>
            `

        }
        return surface3d
    }

    affichage(tourDuRobot = false) {

        if (this.premierAffiche) {
            // création des bâtons
            const batons = document.createElement('div')
            batons.classList.add('batons')
            for (let i = this.nombre; i > 0; i--) {
                const container = document.createElement('article')
                const baton = document.createElement('div')
                container.className = `b${i} ctrB`
                baton.className = 'baton'
                baton.setAttribute('name', 'baton')
                if (this._3d) {
                    baton.style.top = '50%'
                    baton.style.left = 10 + i * 30 + 'px'
                    // baton.style.position = 'absolute'
                    baton.innerHTML = this.surfaces(i)
                    baton.classList.add('aff3d')
                } else {
                    baton.classList.add('flat')
                }
                container.append(baton)
                this.dom = [container, ...this.dom]
                // JeuxDesBatons.dom_plateforme.innerHTML = ""
                batons.prepend(container)
                JeuxDesBatons.dom_plateforme.append(batons)
            }
        }


        this.premierAffiche ? this.premierAffiche = false : '' // plateau vert
        // identifie les piochables, créer action de retirer les pioches selectionnées
        if (!tourDuRobot) {
            // console.log('affichage robot')
            this.gestionPioche()
            // this.dom.forEach(function (x) {
            //     x.addEventListener('click', IfBatons3d.gestionPioche)
            // })
        }

    }
    /**
     * retirer n batons de la varable et du DOM en partant de la fin
     * @param {number} nb 
     */
    retirerDernierBaton(nb = 0) {
        this.dom[this.dom.length - 1 - nb].remove()
        this.dom.pop()
    }
    ajouterAuDernierBaton(ele, siblingRang = 0) {
        this.dom[this.dom.length - 1 - siblingRang].prepend(ele)
    }
    static actua({ dom, nombre }) {
        IfBatons3d.getInstance().dom = dom
        IfBatons3d.getInstance().nombre = nombre
    }


    gestionPioche() {
        let { pioche, dom, infoBatonHover, infoBaton, piocher } = this


        let interactBation = dom.filter((baton, i, tab) => pioche.some(p => p === (tab.length - +baton.classList[0].substr(1) + 1)))
        interactBation.forEach(baton => {
            infoBaton(baton)
            infoBatonHover(baton)
            // POUR LES HOVERS INTERACT
            // let posEle = parseInt(baton.classList[0].substr(1)),
            //     pos = nombre - posEle + 1
            // dom.filter((x, j) => j >= nombre - pos)
            //     .forEach(ele => ele.dataset = { msg: '☠️', hover: baton.classList[0] })
            baton.addEventListener('click', piocher)
        })
    }
    /**
     * gestion de l'affichage des indicateurs de cible
     * @param {HTMLElement} element 
     */
    infoBaton(element, action = 'add') {
        element.children.baton.classList[action]('active')
    }
    /**
     * gestion de l'affichage des indicateurs de cible
     * @param {HTMLElement} element 
     */
    infoBatonHover(element) {
        let { targetInfoIn, targetInfoOut } = IfBatons3d.getInstance()
        element.addEventListener('mouseenter', targetInfoIn)
        element.addEventListener('mouseleave', targetInfoOut)
    }

    targetInfoIn() {
        // let targetInfoIn = IfBatons3d.getInstance().targetInfoIn,
        let nextSibling = this.previousSibling

        while (nextSibling = nextSibling.nextSibling) {
            let msg = document.createElement('div')
            msg.innerText = '☠️'
            msg.style.position = 'absolute'
            msg.style.fontSize = '2rem'
            msg.className = 'targetInfo comeIn'
            msg.setAttribute('name', 'targetInfo')
            nextSibling.append(msg)
        }
        // this.removeEventListener('mouseenter', targetInfoIn)
    }

    targetInfoOut() {
        let targetInfoOut = IfBatons3d.getInstance().targetInfoOut,
            nextSibling = this.previousSibling,
            count = 1
        this.removeEventListener('mouseenter', targetInfoOut)
        while (nextSibling = nextSibling.nextSibling) {
            let targetInfo = nextSibling.children.targetInfo
            targetInfo.classList.remove('comeIn')
            targetInfo.classList.add('goOut')
            IfBatons3d.retirer(targetInfo)
        }
    }


    piocher() {
        let { dom, nombre, infoBaton } = IfBatons3d.getInstance(),
            posEle = parseInt(this.classList[0].substr(1)),
            pos = nombre - posEle + 1,
            lesPioches = dom.filter((x, j) => j >= nombre - pos),
            duration = 0.3
        // si correspond choix de pioche
        lesPioches.forEach((ele, i) => {
            ele.classList.add('goOut')
            ele.style.animationDuration = duration + 's'
            ele.style.animationDelay = duration + i * 0.2 + 's'
            ele.addEventListener('animationend', () => {
                console.log('héé')
                    IfBatons3d.retirer(ele)
            })
        })
        dom = dom.slice(0, posEle - 1)

        // retirer à la fin du tour les actives
        dom.forEach(ele => infoBaton(ele, 'remove'))

        nombre = nombre - pos
        // met à jour le dom virtuel hahahaaha
        IfBatons3d.actua({ dom, nombre })


        dom.forEach(x => x.removeEventListener('click', IfBatons3d.piocher))
        // pas cool la gestion car active une méthode du jeux (app) dans l'affichage
        JeuxDesBatons.getInstance().jouer(nombre)
    }


    static retirer(domElement, time = 0) {
        if (time) {
            setTimeout(() => {
                console.log(domElement)
                domElement.remove()
            }, time);
            return
        }
        domElement.remove()

    }

    static getInstance() {
        return this.instance
    }

    /**
     * 
     * @param {object} obj 
     *   * {_plateforme,
     *  _nombre,
     *  _pioche = [1, 2, 3],
     *  _3d = true}
     */
    static setInstance(obj) {

        return this.instance = new IfBatons3d(obj)
    }


}