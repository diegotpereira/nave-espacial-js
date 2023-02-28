import JogoUI  from "./JogoUI.js";

export default class Jogo {

    constructor() {

        this.ui = new JogoUI(this);

        this.addEventos();
        this.animate();
    }

    addEventos() {

        const tempo_limite_retorno = 1

        setTimeout(() => {
            this.play();
        }, tempo_limite_retorno);
    }

    play() {

        this.animate();
    }

    draw() {

        this.ui.draw();
    }

    animate() {

        this.ui.ctx.fillStyle = '#1e1a20';
        this.ui.ctx.fillRect(
            0,
            0,
            this.ui.DOM.canvas.width,
            this.ui.DOM.canvas.height
        )

        this.draw();

        this.animation = requestAnimationFrame(this.animate)
    }
}