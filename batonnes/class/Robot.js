class Robot {

    static _instance

    _stratege = []

    _game




    constructor() {
        this.nom = "Robot"
        this.game = null

        // this.entrer()
    }

    static get instance() {
        return Robot._instance
    }
    static set instance(ia) {
        Robot._instance = new Robot()
    }

    get stratege() {
        return this._stratege
    }
    // set stratege(value) {
    //     this.tacticBuilder()
    //     return this
    // }

    get interface() {
        if (this._game === null) this._game = JeuxDesBatons
        return this._game
    }
    set interface(value) {
        this._game = value
    }

    /**
     * Récuperer les commandes de l'interface de jeux
     * @param {JeuxDesBatons} instanceInterface Class
     * @param {Object} instanceGame instance de class
     */
    toCommand(instanceGame) {
        if (this.interface === undefined) {
            this.interface = instanceGame
            this.game = instanceGame
        }
        console.log(instanceGame)
        return this.tacticBuilder()
    }

    toTest() {
        this.interface = JeuxDesBatons
        JeuxDesBatons.setInstance({
            parametre: {
                nbBatons: 14,
                pioche: [1, 2, 3],
                joueur: new Joueur("bruno"),
                joueur2: Robot.instance = new Robot(),
                ia: true
            },
            vueBatons: IfBatons3d,
            vue3d: false
        })
        this.game = JeuxDesBatons.getInstance()
        return this
    }

    // à la fin, il doit en rester qu'un
    // le reste corespondant à la plus petite des choix de pioche à perdu
    // G = gagner, P = perdu, E = égalité
    // si après pioche = -1 | pos[0]  ==> c'est perdu

    tacticBuilder(instanceGame) {
        this.game = instanceGame
        let { pioche, nbBatons } = instanceGame
        // let pioche = [1, 2, 4], nombre = 20

        this.stratege.push([1, "P"])
        for (let index = 1; index < nbBatons; index++) {
            this.stratege.push([])
        }

        for (let i = 1; i < nbBatons; i++) {
            pioche.forEach((chxPioche, pos) => {
                // après pioche <== situation

                i >= chxPioche
                    ? this.stratege[i - chxPioche][1] === "P"
                        ? this.stratege[i] = [pos, "G"]
                        : this.stratege[i] && this.stratege[i][1] !== "G"
                            ? this.stratege[i] = [pos, "P"]
                            : null
                    : null // ici le match null à développer
            })

        }
        return this
    }

    toGiveGameTurn() {
        // this.game.ifJoueurActive(this.game.changeTour())
        // this.game.affichage()

        // return this
    }

    toPlay() {
        // regard le nbr restant
        // prend le meilleur coup pour l'envoyer sur une position perdante
        // je regard si les choix de pioche  match avec une position perdante
        // sinon je joue le plus petit

        let { pioche, nbBatons } = this.game
        // { dom_plateforme, dom_ij2 } = this.interface
        let robotTakeOff = pioche[this.stratege[nbBatons - 1][0]]

        this.game.nbBatons = nbBatons - robotTakeOff
        this.game.vueBatons.robotretirer(robotTakeOff)

        // console.log(this.stratege[nbBatons - 1])
        this.game.jouer(this.game.nbBatons)
        console.log("j'ai jouer " + robotTakeOff + " il reste " + this.game.nbBatons)
        // return theChoice ? theChoice : 1
    }



}