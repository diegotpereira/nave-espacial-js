import config from "../Config.js";
import { JogoInimigoServico } from "./JogoInimigoServico.js";
import {JogoUI}  from "./JogoUI.js";

const INICIANDO = 'iniciando';
const PAUSADO = 'pausado';
const FINAL_JOGO = 'final_jogo';
const JOGANDO = 'rodando';



export default class Jogo {

    constructor({ jogador }) {

        this.state = INICIANDO;

        this.ui = new JogoUI(this);
        this.inimigo = new JogoInimigoServico({

            jogo: this,
            jogador
        });

    
        this.iniciarJogador(jogador);
        this.addEventos();
        this.animate();
        this.ui.exibirMenu();

    }

    get iniciando() {

        return this.state === INICIANDO;
    }


    get pausado() {

        return this.state === PAUSADO;
    }

    get fim() {

        return this.state === FINAL_JOGO;
    }

    get jogando() {

        return this.state === JOGANDO;
    }

    iniciarJogador(jogador) {

        this.jogador = jogador;
        this.jogador.init({
            jogo: this
        })
    }

    addEventos() {

        window.addEventListener('visibilitychange', () => {

            let estavaJogando = false;

            if (document.visibilityState === 'hidden') {
                
                if (this.jogando) {
                    
                    estavaJogando = true;
                    this.pause();
                }

            } else if (estavaJogando) {

                const tempo_limite_retorno = 300

                setTimeout(() => {
                    this.play();
                }, tempo_limite_retorno);   
            }
        });
        

        window.addEventListener('click', e => {

            if (this.pausado || this.iniciando) {
                
                this.start();
            }
        });

        this.ui.DOM.FIMJOGO_MELHOR_REINICIAR.addEventListener('click', e => {

            this.start();
        })

        window.addEventListener('keydown', e => {

            if (e.key.toLowerCase() === 'escape') {
                
                if (this.jogando) {
                    
                    this.pause();

                } else {

                    this.start();
                }
            }

            if (e.key.toLowerCase() === 'enter') {
                
                if (!this.jogando) {
                    
                    e.preventDefault();
                    this.start();
                }
            }
        });
    }

    start() {

        const iniciando = this.fim || this.iniciando;

        if (iniciando) {
            
            this.jogador.start(iniciando);
            
        }

        this.play(iniciando);
    }

    play(iniciando) {

        this.state = JOGANDO;
        this.inimigo.start(iniciando);
        this.animate();
        this.ui.ocultarModais();
    }

    pause() {

        cancelAnimationFrame(this.animation);
        this.state = PAUSADO;
        this.inimigo.stop();
        this.ui.exibirMenu();
    }

    fimJogo() {

        cancelAnimationFrame(this.animation);
        this.state = FINAL_JOGO;
        this.inimigo.stop();
        this.inimigo.removeAll();

        this.ui.exibirFimDeJogo({ 
            pontuacao: this.jogador.pontuacao,
            nivel: this.jogador.nivel,
            // eh_novo_recorde: this.jogador.melhor < this.jogador.pontuacao,
            melhor: localStorage.getItem(config.MELHOR_PONTUACAO) || 0,
        });

        this.jogador.combatente.balas.forEach(bala => bala.destruir());

        if (this.jogador.combatente.trovao) {
            
            this.jogador.combatente.trovao.desaparecer();
        }
    }

    draw() {

        this.ui.draw();
        this.inimigo.draw();
        this.jogador.draw();
        
    }

    animate = () => {

        this.ui.ctx.fillStyle = '#1e1a20';
        this.ui.ctx.fillRect(
            0,
            0,
            this.ui.DOM.canvas.width,
            this.ui.DOM.canvas.height,
        )

        if (this.state !== JOGANDO) {
            
            return;
        }

        this.draw();

        this.animation = requestAnimationFrame(this.animate)
    }
}