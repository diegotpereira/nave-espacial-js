export default class Jogador {

    constructor({ combatente }) {

        this.combatente = combatente;
        this.reset();


    }

    start() {

        this.reset();
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

        this.eventoIniciou = true;

        window.addEventListener('click', e => {

            if(this.jogo.fim) return;

            if (this.podeAtirarBala()) {
                
                this.atirarBala();
            }

            
        });
        
        window.addEventListener('keydown', e => {

            if(this.jogo.fim) return;

            if (e.keyCode === 32 && this.podeAtirarBala()) {
                
                this.atirarBala();
            }

            if (e.key.toLowerCase() === 'enter' && this.podeAtirarTrovao()) {
                
                this.atirarTrovao();
            }

        })

        this.jogo.ui.DOM.trovao.addEventListener('click', () => {

            if (this.podeAtirarTrovao()) {
                
                this.atirarTrovao();
            }
        })
    }

    draw() {

        this.combatente.draw();
    }

    atirarBala() {

        this.combatente.atirarBala();

        this.atualizarDom();
    }

    atirarTrovao() {

        this.combatente.atirarTrovao();

        this.atualizarDom();
    }

    atualizarDom() {

        const ui = this.jogo.ui.DOM;

        ui.nivel.innerText = this.nivel;
    }

    podeAtirarBala() {
        
        if(!this.jogo.jogando) return false;


    }

    podeAtirarTrovao() {

        if(!this.jogo.jogando) return false;
        if(this.combatente.trovao) return false;

        return true;
    }
}