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


        this.affichage()


    }

    baton = classUniq => `<div class="baton b${classUniq}" style="background-color: black"></div>`

    getNombre = () =>
        this.nombre

    setNombre(nombre) {
        this.nombre = nombre
    }

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

    affichage() {

        if (this.premierAffiche) {
            // création des bâtons
            const batons = document.createElement('div')
                batons.classList.add('batons')
            for (let i = this.nombre; i > 0; i--) {
                const baton = document.createElement('div')
                baton.classList.add('b' + i, 'baton')
                if (this._3d){
                    baton.style.top = '50%'
                    baton.style.left = 10 + i * 30 + 'px'
                    // baton.style.position = 'absolute'
                    baton.innerHTML = this.surfaces(4)
                    baton.classList.add('aff3d')
                }else{
                    baton.classList.add('flat')
                }
                this.dom = [baton, ...this.dom]
                // JeuxDesBatons.dom_plateforme.innerHTML = ""
                batons.prepend(baton)
                JeuxDesBatons.dom_plateforme.append(batons)
            }
        }

        this.premierAffiche = false
        // identifie les piochables, créer action remove

        this.dom.forEach(function (x) {
            x.addEventListener('click', IfBatons3d.gestionPioche)
        })

    }

    static actua({ dom, nombre }) {
        IfBatons3d.getInstance().dom = dom
        IfBatons3d.getInstance().nombre = nombre
    }
    

    static gestionPioche() {
        let { pioche, dom, nombre } = IfBatons3d.getInstance(),
            posEle = parseInt(this.classList[0].substr(1)),
            pos = nombre - posEle + 1,
            lesPioches = dom.filter((x, j) => j >= nombre - pos)


        // si correspond choix de pioche
        if (!pioche.every(line => line != pos)) {
            lesPioches.forEach(ele => IfBatons3d.retirer(ele))
            dom = dom.slice(0, posEle - 1)
            IfBatons3d.getInstance().uneFoisTour = IfBatons3d.getInstance().uneFoisTour ? false : false
            nombre = nombre - pos
            // met à jour le dom virtuel hahahaaha
            IfBatons3d.actua({ dom, nombre })

            
            dom.forEach(x => x.removeEventListener('click', IfBatons3d.gestionPioche))
            // pas cool la gestion car active une méthode du jeux (app) dans l'affichage
            JeuxDesBatons.getInstance().jouer(nombre)
        }


        // Ajuste position() ici
        // 
        // 
        // avec de l'animation
    }

    static retirer(domElement) {

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