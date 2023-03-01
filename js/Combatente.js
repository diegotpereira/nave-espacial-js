import { addDomNode, createDomNode, lerp, objetoDeEstiloParaTextoCss, rand } from "./Utils.js";

import mouse from "./Mouse.js";
import { Trovao } from "./Trovao.js";
import { Bala } from "./Bala.js";

export default class Combatente {

    constructor() {

        this.Dom = {};
        this.criarElemento();
        this.createFireDom();

        this.balas = [];

        this.x = {

            atua: 0,
            ant: innerWidth / 2,
        }

        this.y = {

            atua: 0,
            prev: innerHeight - 200,
        }

        root.appendChild(this.Dom.elemento);

        this.limites = {

            width: 80,
            height: 80
        }
    }

    init({ jogador, jogo }) {

        this.jogador = jogador;
        this.jogo = jogo;
        this.draw();
    }

    criarElemento(){

        const elemento = createDomNode('jogador');
        const template = document.createDocumentFragment();

        addDomNode(template, { className: 'body'});
        addDomNode(template, { className: 'head'});
        addDomNode(template, { className: 'glass'});
        addDomNode(template, { className: 'fire'});
        addDomNode(template, { className: 'guns'});
        addDomNode(template, { className: 'fins'});
        addDomNode(template, { className: 'fins2'});
        addDomNode(template, { className: 'overlay'});

        elemento.appendChild(template);

        this.Dom.elemento = elemento;
    }

    

    draw() {

        this.balas.forEach(b => b.draw());

        if (mouse.x !== undefined) {
            
            this.x.atua = innerWidth * (mouse.porcentagem.x + 0.05) * 0.9;
            this.x.ant = lerp(this.x.ant, this.x.atua, 0.15);

        }
        
        if (mouse.y !== undefined) {
            
            this.y.atua = innerHeight * (mouse.porcentagem.y + 0.1) * 0.8;
            this.y.ant = lerp(this.y.prev, this.y.atua, 0.15);

        }

        this.Dom.elemento.style.cssText = objetoDeEstiloParaTextoCss({

            top: this.y.ant + 'px',
            left: this.x.ant - this.limites.width / 2 + 'px',
        });
    }

    createFireDom() {

        const elemento = this.Dom.elemento.querySelector('.fire');
        const contar = 4;


        let fragmento = document.createDocumentFragment();

        for (let index = 0; index < contar; index += 1) {
            
            const span = document.createElement('span');
            const tamanho = rand() * 10;
            let restante = rand(0.45, 0.55) * 100;
            const opacidade = Math.floor(rand(0.3, 1) * 100);
            const tom = rand(0, 20);

            const estilo = {

                width: `${Math.round(tamanho)} px`,
                height: `${Math.round(tamanho)} px`,
                left: `${restante}%`,
                'animation-duration' : `${Math.floor(rand(200, 1000))}ms`,
                'animation-delay' : `${Math.floor(rand() * (index % 5)) * 1000}ms`,
                'background-color' : `hsla(${Math.floor(tom)}, 100%, 55%, ${opacidade}%)` 
            }

            
            
            span.style.cssText = objetoDeEstiloParaTextoCss(estilo);

            fragmento.appendChild(span);
        }

        elemento.appendChild(fragmento);
    }

    atirarTrovao() {

        this.trovao = new Trovao(this.jogador, this, () => {

            this.trovao = null;
        });
    }

    atirarBala() {

        const balaY = this.y.ant + 27;
        const distanciaDoCentro = 29;
        const opcoes = {};

        const args = {

            jogador: this.jogador,
            ctx: this.jogo.ui.ctx,
            y: balaY,

            aoDestruir: bala => {

                this.balas = this.balas.filter(b => b !== bala)
            }
        }

        const b1 = new Bala({

            ...args,
            x: this.x.ant + distanciaDoCentro,
            dx: -1
        });

        const b2 = new Bala({

            ...args,
            x: this.x.ant - distanciaDoCentro,
            dx: 1
        });

        this.balas.push(b1);
        this.balas.push(b2);
    }
}