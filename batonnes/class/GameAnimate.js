class GameAnimate {

    static _instance
    static get instance() {
        return this._instance
    }
    static set instance(plateform) {
        this._instance = new GameAnimate(plateform)
        return this.instance
    }

    static FocusMouse = 0
    /**
     * 
     * @param {HTMLElement} plateform 
     */
    constructor(plateform) {
        this.plateform = plateform
        this.instance
        this.focusSign
    }
    // design staff



    plateformeFocus() {
        let instance = this
        this.createFocus()
        this.plateform.addEventListener('mouseenter', instance.appendFocus)
        this.plateform.addEventListener('mousemove', instance.superCurser)
        this.plateform.addEventListener('click', instance.activeFocus)
        this.plateform.addEventListener('mouseleave', instance.destroyFocus)
    }

    createFocus() {

        this.focusSign = document.createElement('div')
        let f = this.focusSign
        const spanL = `<span></span><span></span><span></span><span></span>`
        f.classList = 'focus focus-comeIn'
        f.innerHTML = spanL
    }
    appendFocus() {
        GameAnimate.instance.plateform.append(GameAnimate.instance.focusSign)
    }

    activeFocus(){
        let focusSign = GameAnimate.instance.focusSign

        focusSign.classList.add("active")
        setTimeout(() => {
            focusSign.classList.remove("active")
        }, 300);
    }

    destroyFocus() {
        GameAnimate.instance.focusSign.remove()
    }
    superCurser(e) {
        // e.stopPropagation()
        GameAnimate.instance.focusSign.setAttribute('style', `left: ${e.clientX}px; top: ${e.clientY}px;`)
        // debounce(function(e){
        //     let f = GameAnimate.instance.focusSign
        //     f.style.left = e.clientX + "px"
        //     f.style.top = e.clientY + "px"
        // }(e), 150, true)
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};