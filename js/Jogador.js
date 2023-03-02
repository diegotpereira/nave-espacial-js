import config from "./Config.js";

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

        this.capacidadeBala = config.capacidadeBala;
        this.balasRestantes = this.capacidadeBala;

        this.ultimaTiroBala = 0;

        this.recarregando = false;


        this.nivel = 1;
        this.vida = 100;
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

    podeCarregar() {

        return !this.recarregando && this.balasRestantes < this.capacidadeBala;
    }

    recarregar() {

        this.recarregando = true;
        this.balasRestantes = this.capacidadeBala;
        this.atualizarDom();

        setTimeout(() => {
           
            this.recarregando = false;
            this.atualizarDom();

        }, config.recarregarTempo);
    }

    atirarBala() {

        this.balasRestantes--;

        this.combatente.atirarBala();

        this.ultimaTiroBala = Date.now();

        this.atualizarDom();

        if (this.balasRestantes <= 0 && this.podeCarregar()) {
            
            this.recarregar();
        }
    }

    atirarTrovao() {


        this.combatente.atirarTrovao();

        this.ultimaTiroBala = Date.now();

        this.atualizarDom();
    }

    atualizarDom() {

        const ui = this.jogo.ui.DOM;

        if(this.recarregando) {

            ui.balasRestantes.innerHTML = '<small>Recarregando</small>';

        } else {

            ui.balasRestantes.innerText = this.balasRestantes;
        }


        // ui.capacidadeBala.innerText = '∞';

        ui.trovao.classList.toggle('active', this.podeAtirarTrovao());

        ui.pontuacao.innetText = this.pontuacao;
        
        ui.nivel.innerText = this.nivel;

        ui.vida.style.width = `${this.vida}%`;
        // ui.vidaText.innerText = `${Math.floor(this.vida)}%`;
    }

    podeAtirarBala() {
        
        if(!this.jogo.jogando) return false;
        
        if (this.balasRestantes <= 0 || this.recarregando) {
            
            return false;
        }

        let intervaloTempoTiro;

        if (this.combatente.trovao) {
            
            intervaloTempoTiro = 200;

        } else {

            intervaloTempoTiro = 200 - Math.min(this.nivel, 20) * 8;
        }

        return Date.now() - this.ultimaTiroBala > intervaloTempoTiro;
    }

    podeAtirarTrovao() {

        if(!this.jogo.jogando) return false;
        if(this.combatente.trovao) return false;

        return true;
    }
}