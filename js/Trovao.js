import { lerp } from "./Utils.js";

export class Trovao {

    constructor(jogador, combatente, aoDestruir) {

        this.jogador = jogador;
        this.combatente = combatente;

        this.DOM = {

            elemento: document.createElement('div'),
        }

        this.DOM.elemento.classList.add('trovao');
        this.active = true;
        this.ttl = 1500;
        this.height = 0;
        this.top = this.combatente.y.ant = this.height + 10;

        this.acertou = false;

        setTimeout(() => {
            
            this.acertou = true;
        }, 300);
        
        root.appendChild(this.DOM.elemento);

        this.draw();
        this.aoDestruir = aoDestruir;

        this.encontreCronometroInimigos = setInterval(() => {
           
            this.encontrarInimigos();
        }, 50);

        this.encontreCronometroInimigos = setInterval(() => {
            
            this.encontrarInimigos();
        }, 50);

        setTimeout(() => {
           this.desaparecer(); 
        }, this.ttl);
    }

    encontrarInimigos() {

        const inimigos = this.jogador.jogo.inimigo.inimigos;
        const len = inimigos.length;

        for (let index = 0; index < len; index += 1) {
            
            const inimigo = inimigos[index];

            if (Math.abs(inimigo.x + inimigo.width / 2 - this.combatente.x.ant) < 10) {

                inimigo.destruir();
                this.jogador.adcionarPontuacao(true);
                
                break;
            }
            
        }
    }

    draw() {

        if (this.acertou) {
            
            this.top = 0;
            this.height = this.combatente.y.ant + 2;

        } else {

            this.top = lerp(this.top, 0, 0.1);
            this.height = lerp(this.height, this. combatente.y.ant + 2, 0.1);
        }

        this.DOM.elemento.style.cssText = `Top: ${this.top}px; height: ${this.height}px; left: ${this.combatente.x.ant}px`;
    }

    desaparecer() {

        if(!this.active)  return;

        this.active = false;
        this.DOM.elemento.classList.add('partindo');

        setTimeout(() => {
           
            clearInterval(this.encontreCronometroInimigos);

            this.DOM.elemento.classList.remove('partindo');
            this.DOM.elemento.classList.add('vivendo')

            setTimeout(() => {
                this.aoDestruir(this);
                this.DOM.elemento.remove(); 
            }, 400);
        }, 600);
    }
}