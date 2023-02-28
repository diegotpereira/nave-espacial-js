import Estrela from "../Estrela.js";

export default class JogoUI {

    constructor() {

        this.DOM = {};
        this.DOM.canvas = document.querySelector('canvas');
        this.ctx = this.DOM.canvas.getContext('2d', {

            alpha: false,
        })

        this.estrelas = [];

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
}