/**
 * @class
 */
class JeuxDesBatons {

    static instance = null

    tour = false
    nbBatons
    pioche

    dom = {}

    /**
     * 
     */
    _vueBatons
    get vueBatons() {
        return this._vueBatons
    }
    set vueBatons(value) {
        this._vueBatons = value
    }

    premiereFois = true

    /**
     * @constructor
     * @param {Object} param0
     * @param {Object} param0.parametre
     * @param {Number} param0.parametre.nbBatons
     * @param {Array} param0.parametre.pioche
     * @param {Joueur} param0.parametre.joueur
     * @param {Joueur | Brobot} param0.parametre.joueur2
     * @param {Object} param0.vueBatons
     * @param {Boolean} param0.vue3d
     */

    constructor({
        parametre = {
            nbBatons: 20,
            pioche: [1, 2, 3],
            joueur: { nom: "Joueur", score: 0 },
            joueur2: Joueur | Brobot,
            ia: true | false
        },
        vueBatons = IfBatons3dObject,
        vue3d = false
    } = {},
    ) {
        // this.nbBatons = nbBatons < 11 ? 11 : nbBatons > 30 ? 30 : nbBatons
        // initie les propriétés et paramètre
        for (const key in parametre) {
            if (parametre.hasOwnProperty(key)) {
                this[key] = parametre[key]
            }
        }


        this.vueBatons = vueBatons.setInstance({ _nombre: this.nbBatons, _pioche: this.pioche, _3d: vue3d })

        // personnalise les informations joueurs
        JeuxDesBatons.setInterfaceJoueurs(this)

        this.ifJoueurActive(false)


        // lancement moisi de l'interface
        this.ia 
        ? this.robotActive().affichage(this.ia).robotJouer()
        : this.affichage(false)
    }

    /**
     * raccourci d'accés DOM
     * @param {string} ele selecteur DOM
     */
    static docSlt(ele) {
        return document.querySelector(ele)
    }


    /**
     * gestion de l'initialisation avec affichage du form et traitement des données
     * @param {object} param0 
     * @param {object} param0.setDom.plateforme 
     * @param {string} param0.setDom.ij1 DOM Selecteur
     * @param {string} param0.setDom.ij2  DOM Selecteur
     * @param {string} param0.setDom.btnStart  DOM Selecteur
     * @param {string} param0.setDom.initface  DOM Selecteur
     * @param {string} param0.setDom.initface  DOM Selecteur
     */

    static init({
        setDom = {
            plateforme: '.plateforme',
            ij1: '.ifj1',
            ij2: '.ifj2',
            btnStart: '.commencer',
            initface: '.initialiseur'
        }
    } = {}) {
        for (const key in setDom) {
            if (setDom.hasOwnProperty(key)) {
                this['dom_' + key] = this.docSlt(setDom[key])
            }
        }
        b(this.dom_initface).hide()
        this.dom_btnStart.addEventListener("click", JeuxDesBatons.commencer)
        JeuxDesBatons.dom_initface.firstElementChild.addEventListener('submit', JeuxDesBatons.submitInit)
    }

    /**
     * 
     * @param {Event} e 
     */
    static submitInit(e) {
        e.preventDefault()
        // JeuxDesBatons.dom_initface.firstElementChild
        let form = e.target

        JeuxDesBatons.setInstance({
            parametre: {
                nbBatons: parseInt(form.nbBatons.value),
                pioche: form.pioche.value.split(',').map(x => parseInt(x)),
                joueur: new Joueur(form.nomJoueur.value),
                joueur2: form.ia.checked ? Brobot.instance = new Brobot() : new Joueur(form.nomJoueur2.value),
                ia: form.ia.checked
            },
            vueBatons: IfBatons3d,
            vue3d: form._3d.checked ?? false
        })

        form.reset()
        b(JeuxDesBatons.dom_initface).fadeOut()

    }

    static setInterfaceJoueurs(instance) {
        this.dom_ij1.firstElementChild.innerHTML = instance.joueur.nom
        this.dom_ij2.firstElementChild.innerHTML = instance.joueur2.nom
    }

    static commencer() {
        let btnS = JeuxDesBatons.dom_btnStart
        b(JeuxDesBatons.dom_initface).slideDown('slow')
        btnS.removeEventListener("click", JeuxDesBatons.commencer)
        btnS.innerText = "réinitialiser"
        btnS.addEventListener("click", JeuxDesBatons.reset)
    }

    static reset() {

        let inst = JeuxDesBatons.getInstance()
        inst.ia ? inst.joueur2.move.getBack() : ''
        let btnS = JeuxDesBatons.dom_btnStart

        btnS.innerHTML = "Commencer"
        btnS.removeEventListener("click", JeuxDesBatons.reset)
        JeuxDesBatons.dom_plateforme.innerHTML = ""
        btnS.addEventListener("click", JeuxDesBatons.commencer)

        b('.actif').removeClass('actif')
        JeuxDesBatons.instance = null

    }

    static getInstance() {

        // return this.instance ? JeuxDesBatons.setInstance() : this.instance
        return this.instance
    }

    /**
     * 
     * @see {@link constructor}
     * @param {this.constructor} param0 
     */
    static setInstance(
        {
            parametre = {
                nbBatons: 15,
                pioche: [1, 2, 3]
            },
            vueBatons = IfBatons3d,
            vue3d = false

        } = {}) {


        return this.instance = new JeuxDesBatons({ parametre, vueBatons, vue3d })
    }

    /**
     * met un contour sur l'interface du joueur qui doit jouer
     * @param {boolean} tour true ou false
     */
    ifJoueurActive(tour = true) {


        let dom2 = tour => [JeuxDesBatons.dom_ij1, JeuxDesBatons.dom_ij2]
            .forEach((x, i) => i == (tour ? 0 : 1) ?
                !x.classList.contains('actif') ? x.classList.add('actif') : null :
                x.classList.contains('actif') ? x.classList.remove('actif') : null
            )

        dom2(tour)
    }

    /**
     * Batons restant dans la parti
     * @param {number} actuaNbBatons 
     */
    jouer(actuaNbBatons) {
        // robot
        this.ia && this.premiereFois ? this.robotActive() : null

        this.premiereFois = false
        
        this.nbBatons = actuaNbBatons
        this.ifJoueurActive(this.changeTour())
        // console.log(this.tour, "le premier tour est négatif")
        if (this.nbBatons > 1) {
            !this.tour && this.joueur2.nom === "Brobot"
                ? this.robotJouer()
                : this.affichage()
        } else {
            this.resulter()
        }

    }

    robotActive() {
        this.joueur2.tacticBuilder(this)
        return this
    }
    robotJouer() {
        this.joueur2.toPlay()
    }

    changeTour() {
        this.tour = !this.tour
        return this.tour
    }

    affichage(actionRobotisee = false){
        this.vueBatons.affichage(actionRobotisee)
        return this
    }

    resulter() {
        let msg = document.createElement('div')
        msg.style.fontSize = '2rem'
        msg.style.textAlign = 'center'
        msg.style.transform = 'translateZ(0)'
        this.nbBatons !== 1 ? this.changeTour() : ""
        msg.innerText = `🥳 ${!this.tour ? this.joueur.nom : this.joueur2.nom} a gagné 🥳`
        JeuxDesBatons.dom_plateforme.prepend(msg)
    }

    tuEsPartis() {
        JeuxDesBatons.instance = null
    }
}