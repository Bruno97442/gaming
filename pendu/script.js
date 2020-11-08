$('document').ready(() => {

    let strMC = "",
        uMC = "",
        strLS,
        essai,
        nbrE = 10,
        cptBR,
        bonneReponse = 0,
        erreurs = "",
        preJeux = true,
        tab_action_remove = [".o8", ".o9", ".o10"],
        commencer = (t = "") => {
            forms.hide()
            interface.hide()
            resInfo.hide()
            essai = 0
            cptBR = 0
            if (t == 'reset') {
                resInfo.html("")
                Afferreurs.html("")
                interface.html("")
                erreurs = ""
                bonneReponse = 0
                tab_action_remove.map(ele => {

                    $(ele).removeClass(".o8 .o9 .o10")

                });
            }

        }

    let interface = $(".msg.interface"),
        Afferreurs = $(".msg.erreurs"),
        resInfo = $(".msg.res")
    jouer = $('.jouer'),
        forms = $('form'),
        entreMotForm = $('#entreMot'),
        LettreForm = $('#entreLettre'),
        anim = $('.anim'),
        homme = $('.homme'),
        affMot = content =>
            `<div class="affMot pre-o10">${content}
        <div>`,
        affLtr = (lettre, { colore = false, b4Color = "success" } = {}) => {
            colore = colore ? `class="text-${b4Color}"` : ""
            return `
            <span ${colore}>${lettre}</span>`
        }





    /**
     * Peut :   cryter, 
     *          créer un 'div' contenant une suite de 'spans' de chaque lettre 
     *          ou les deux à la fois
     * @param {string} mot 
     * @param {object} crypter caractère de remplacement
     */
    let uMC_manager = (mot, { crypter = true, crypCar = '_', spans = false, diff = { pos: [], b4Color: "success" } } = {}) => {
        let lesSpans = "", underscores = "", aff

        if (crypter) {
            for (let i = 0; i < mot.length; i++) {
                underscores += crypCar
            }
        }

        aff = crypter ? underscores : mot

        if (spans) {

            for (let i = 0; i < mot.length; i++) {

                lesSpans += affLtr(aff[i], { colore: diff.pos[i], b4Color: diff.b4Color }) // ici reprendre la position dans le string
            }
            aff = affMot(lesSpans)
        }

        return aff
    }

    let animaction = (ordre = 'cache', type_animate = "fadeOut") => {
        ordre == 'cache' ? anim[type_animate]() :
            ordre === 8 ||
                ordre === 10 ?
                $('.pre-o' + ordre).addClass('o' + ordre) :
                $('.anim.o' + ordre)[type_animate]()
    }

    let uMCLettreControle = (lettre, motCryt, erreurs) =>
        motCryt.match(lettre) ? 1
            : erreurs.match(lettre) ? -1 : 0

    let uMCLettreReplace = (lettre, mot, motCryt) => {
        let nbrLettre = 0, ltrPos = []

        for (let pos = 0; pos < mot.length; pos++) {

            if (mot[pos] == lettre) {
                nbrLettre++
                motCryt = motCryt.substr(0, pos) +
                    lettre +
                    motCryt.substr(pos + 1, motCryt.length - pos)
                ltrPos = [...ltrPos, true]
            } else {
                ltrPos = [...ltrPos, false]

            }
        }
        return [nbrLettre, motCryt, ltrPos]
    }

    let penduTour = function () {
        let nbrLettre, msg = "", posLtr, alertLettreRepeter = uMCLettreControle(strLS, uMC, erreurs)

        if (!alertLettreRepeter) {
            [nbrLettre, uMC, posLtr] = uMCLettreReplace(strLS, strMC, uMC)
            bonneReponse++

            if (nbrLettre) {
                cptBR = cptBR + nbrLettre
                msg = "Super ! Continuez."
                interface.slideUp("fast", function () {
                    $(this).html(uMC_manager(uMC,
                        {
                            crypter: false,
                            spans: true,
                            diff: { pos: posLtr }
                        }
                    ))
                    $(this).slideDown("slow")
                })
            } else {
                essai++
                erreurs += strLS
                Afferreurs.html(uMC_manager(erreurs, { crypter: null, spans: true }))
                msg = "Dommage... Continuez quand même."
            }
        }

        msg += alertLettreRepeter === 1 ? `Vous avez déjà entrer la lettre <i class="text-info">${strLS}</i> !`
            : alertLettreRepeter === -1 ? `Vous avez déjà entrer la lettre <i class="text-danger">${strLS}</i> !`
                : ""

        resInfo.html(msg)
        essai
        animaction(essai, 'fadeIn')

        cptBR === strMC.length ? resultat() : null
        essai === 10 ? resultat(0) : null

    }
    let resultat = (positiveOuNegative = true) => {


        if (positiveOuNegative) {
            resInfo.html(`Bravo ! Vous avez gagné en ${bonneReponse} essais !`)
            homme.fadeIn()
        } else {

            resInfo.html(`Perdu ! le mot était <strong class="text-danger">"${strMC}"</strong>
        <br> Vous avez déjà trouvé ${cptBR} lettres ; vous ferez mieux la prochaine fois !`)
        }

        jouer.fadeIn("slow")

    }

    // Etat initial

    commencer()


    // Etat initial -fin
    jouer.click(function () {
        preJeux ? preJeux = false : commencer('reset')
        $(this).slideUp("500", () => entreMotForm.slideDown())
    })
    entreMotForm.submit(function (e) {
        e.preventDefault()
        strMC = e.currentTarget.motCache.value
        this.reset()
        $(this).slideUp()
        LettreForm.slideDown()

        animaction()

        uMC = uMC_manager(strMC)

        interface.append(uMC_manager(uMC, { crypter: false, spans: true }))

        interface.fadeIn()
    })

    LettreForm.submit(e => {
        e.preventDefault()
        let ltrFrm = e.currentTarget
        strLS = ltrFrm.strLS.value
        ltrFrm.reset()
        resInfo.fadeIn("slow")
        penduTour()
    })


})
