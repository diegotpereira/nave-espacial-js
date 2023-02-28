import Estrela from "../Estrela.js";
import { createDomNode, addDomNode } from "../Utils.js";

export class JogoUI {

    constructor(jogo) {

        this.DOM = {};
        this.DOM.canvas = document.querySelector('canvas');
        this.ctx = this.DOM.canvas.getContext('2d', {

            alpha: false,
        })

        this.estrelas = [];

        this.criarMenu();

        this.criarEstrelas();

        this.addEventos();
    }

    addEventos() {

        const redimensionar = () => {

            this.DOM.canvas.width = window.innerWidth;
            this.DOM.canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', redimensionar);

        redimensionar();
    }

    criarEstrelas() {

        for (let index = 0; index < 10; index += 1) {
            
            this.estrelas.push(
                new Estrela({
                    ctx: this.ctx
                })
            )
        }
    }

    draw() {

        this.estrelas.forEach(estrela => estrela.draw());
    }

    criarMenu() {

        const elemento = createDomNode('modal game-menu');

        elemento.classList.add('hidden');
        this.DOM.menu = elemento;

        const content = addDomNode(elemento, { className: 'content'});

        addDomNode(content, {

            className: 'titulo',
            tag: 'h1',
            text: 'Nave Espacial JS'
        });

        addDomNode(content, {

            className: 'subtitulo',
            tag: 'h2',
            text: 'Pressione ENTER para iniciar'
        });

        root.appendChild(elemento);
    }

    exibirMenu() {

        this.DOM.menu.classList.remove('hidden');
    }

    ocultarModais() {

        this.DOM.menu.classList.add('hidden');
    }
}