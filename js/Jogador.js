export default class Jogador {

    constructor({ combatente }) {

        this.combatente = combatente;
        this.reset();


    }

    start() {

        this.atualizarDom();
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

    reset() {

        this.nivel = 1;
    }

    addEventos() {

        let eventoIniciou;

        if(this.eventoIniciou) return 

        eventoIniciou = true;

        window.addEventListener('click', e => {

            if(this.jogo.fim) return;

            
        });
        
        window.addEventListener('keydown', e => {

            if(this.jogo.fim) return;

        })

        this.jogo.ui.DOM.trovao.addEventListener('click', () => {

            if (this.podeAtirarTrovao) {
                
                this.atirarTrovao();
            }
        })
    }

    draw() {

        this.combatente.draw();
    }


    atualizarDom() {

        const ui = this.jogo.ui.DOM;

        ui.nivel.innerText = this.nivel;
    }
}