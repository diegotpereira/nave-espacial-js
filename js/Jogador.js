export default class Jogador {

    constructor({ combatente }) {

        this.combatente = combatente;


    }

    start() {

        this.addEventos();

        setTimeout(() => {
            this.atualizarDom();
        }, 2050);
    }

    init({ jogo }) {

        this.jogo = jogo;
        this.combatente.init({ jogador: this, jogo });

        this.atualizarDom();
    }

    addEventos() {}

    draw() {

        this.combatente.draw();
    }


    atualizarDom() {

        const ui = this.jogo.ui.DOM;
    }
}