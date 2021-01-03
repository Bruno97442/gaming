class Brobot {

    static _instance

    _stratege = []

    _game

    body


    constructor() {
        this.nom = "Brobot"
        this.game = null
        this.body = document.querySelector('.brobot')

        // this.entrer()
    }

    static get instance() {
        return this._instance
    }
    static set instance(instance) {
        this._instance = instance
    }

    get stratege() {
        return this._stratege
    }

    get game() {
        if (this._game === null) this._game = JeuxDesBatons
        return this._game
    }
    set game(value) {
        this._game = value
    }

    place() {
        this.move = MotionObject.setInstance({ HTMLElement: this.body, name: 'Brobot' })
        this.move.torpedo(document.querySelector('.ifj2'))
        this.move.rotate(0)

        this.aPlay = BroFocus.setInstance(
            {
                name: "robotFocus"
            })
            // Robot.instance = this
    }
    // à la fin, il doit en rester qu'un
    // le reste corespondant à la plus petite des choix de pioche à perdu
    // G = gagner, P = perdu, E = égalité
    // si après pioche = -1 | pos[0]  ==> c'est perdu

    tacticBuilder(instanceGame) {
        this.place()

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

    toPlay() {
        // regard le nbr restant
        // prend le meilleur coup pour l'envoyer sur une position perdante
        // je regard si les choix de pioche  match avec une position perdante
        // sinon je joue le plus petit

        let { pioche, nbBatons } = this.game,
            robotTakeOff = pioche[this.stratege[nbBatons - 1][0]],
            KillingMin = 1000,
            goOutduration = 0.5,
            readyToChange = false,
            game = Brobot.instance.game

        game.nbBatons = nbBatons - robotTakeOff
        this.BalonInterface = game.vueBatons

        for (let i = 0; i < robotTakeOff; i++) {
            let focusElement = this.aPlay.createFocus('focus focus-comeIn focusBaton', true)
            setTimeout(() => {
                // this.game.vueBatons.retirerDerniersBatons(robotTakeOff)
                this.BalonInterface.ajouterAuDernierBaton(focusElement, i)

            }, i * 150);
            focusElement.dataset.end = i + 1 === robotTakeOff
            focusElement.addEventListener('animationend', afterFocusInjection)

        }




        function afterFocusInjection(e) {
            this.removeEventListener('animationend', afterFocusInjection)
            let m = document.createRange().createContextualFragment(`<article class="rocket dropDown r1">
            	<main class="rocket-body">
            		<div class="rocket-lead"></div>
            		<div class="rocket-main"></div>
            		<div class="rocket-tail"></div>
            		<div class="rocket-blast"></div>
            		<div class="rocket-blast2"></div>
            	</main>
            </article>`).firstElementChild;
            m.dataset.end = this.dataset.end
            this.after(m)
            m.addEventListener('animationend', afterBombardmentInjection)

        }
        function afterBombardmentInjection(e) {
            this.removeEventListener('animationend', afterBombardmentInjection)
            let p = this.nextSibling
            this.remove()

            MotionObject.boom(p)
            p.classList.add('goOut')
            p.dataset.end = this.dataset.end

            p.style.animationDuration = goOutduration + 's'
            p.style.animationDelay = goOutduration + 's'
            p.addEventListener('animationend', afterGoOutAnimation)

        }

        function afterGoOutAnimation(e) {
            this.removeEventListener('animationend', afterGoOutAnimation)
            IfBatons3d.getInstance().retirerDernierBaton()
            
            readyToChange = this.dataset.end

        }
        
        let watching = setInterval(() => {
            if ( readyToChange === "true" ) {
                game.jouer(game.nbBatons)
                clearInterval(watching)
            }
        }, 200);
    }

}