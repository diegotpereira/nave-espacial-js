import { addDomNode, rand } from "./Utils.js";


const emojies = ['👽', '👾', '🚀', '💣', '🔥', '💀', '🤖', '🌌', '🎃', '🌠'];

export default class Inimigo {

    constructor({ jogo, velocidade, inimigoServico }) {

        this.jogo = jogo;
        this.servico = inimigoServico;
        this.active = true; 

        this.vida = 100;
        this.dy = velocidade;
        this.height = 30;
        this.width = 30;
        this.x = rand(0.25, 0.75) * innerWidth;
        this.y = -50;

        this.DOM = {};
        this.DOM.elemento = addDomNode(root, { className: 'inimigo'});
        this.DOM.elemento.style.left = `${this.x}px`;
        this.DOM.elemento.innerHTML = emojies[Math.floor(rand(0, emojies.length))];
    }

    draw() {

        if (this.y > innerHeight) {
            
            this.servico.telaCruzada(this);
            this.DOM.elemento.remove();

            return
        }

        const combatente = this.jogo.jogador.combatente;
        const combatenteX = combatente.x.ant - combatente.limites.width / 2;
        const combatenteY = combatente.y.ant;

        if (combatenteX + combatente.limites > this.x &&
            combatenteX < this.x + this.width && 
            this.y + this.height > combatenteY && 
            this.y < combatenteY + combatente.limites.height) {

                this.jogo.jogador.decrementarVida();

                this.destruir();
                return;
        }

        this.y += this.dy;
        this.DOM.elemento.style.top = `${this.y}px`;
    }

    bater() {

        this.vida -= 50;
        this.DOM.elemento.classList.add('danificado');

        if(this.vida <= 0) {

            this.destruir();

            return true;
        }
    }
    
    destruir() {

        this.active = false;
        this.DOM.elemento.classList.add('destruir');
        this.jogo.inimigo.remove(this);
        this.dy = 0;

        setTimeout(() => {
            
            this.DOM.elemento.remove();
        }, 500);
    }
}