import Inimigo from "../Inimigo.js";

export class JogoInimigoServico {

    constructor({ jogo, jogador }) {

        this.jogo = jogo;
        this.jogador = jogador;
        this.inimigos = [];
        this.contador = null;
    }

    start(gerarNoMonte = false) {

        if (gerarNoMonte) {
            
            this.inimigos = [];
            this.gerar();
        }

        this.contador = setInterval(() => {

            this.gerar();
        }, 1500)
    }

    stop() {

        clearInterval(this.contador);
    }

    gerar() {

        if (!this.jogo.jogando) return;

        const len = Math.random() * Math.min(1 + this.jogador.nivel / 6, 5);
        

        for (let index = 0; index < len; index += 1) {
            
            if(this.inimigos.length > 10) break;

            const inimigo = new Inimigo({

                jogo: this.jogo,
                inimigoServico: this,
                velocidade: (0.3 + Math.random()) * 1.4 + this.jogador.nivel * 0.09,
            });
            
            this.inimigos.push(inimigo);     
        }
    }

    draw() {

        this.inimigos.forEach(inimigo => inimigo.draw());
    }

    telaCruzada() {

        
    }
}