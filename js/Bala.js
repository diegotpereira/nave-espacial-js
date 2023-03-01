export class Bala {

    constructor({ jogador, ctx, x, y, dx, destroy }) {
        
        this.aoDestruir = aoDestrui;
        this.jogador = jogador;
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.dx = dx / 4;
        this.xx = 60;
        this.dy = 7;
        this.active = true;

        this.width = 4;
        this.height = 5;
        this.dh = 0.2;

        this.draw();
    }

    draw() {

        const ctx = this.ctx;
        ctx.beginPath();

        ctx.shadowColor = '#1495ff';
        ctx.storkeStyle = '#1495ff';
        ctx.fillStyle = '#fff';

        ctx.shadowBlur = 20;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height, []);

        ctx.closePath();
    }
}