export class Bala {

    constructor({ jogador, ctx, x, y, dx, aoDestruir }) {
        
        this.aoDestruir = aoDestruir;
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

    atualizar() {

        if(!this.active) return;

        this.y -= this.dy;

        if (this.y < -30) {
            
            this.destruir();

            return;
        }

        if (this.xx > 0) {
            
            this.xx -= 1;
            this.x += this.dx;
        }

        if (this.height < 24) {
            
            this.height = this.height + this.dh;
        }

        if (this.y > 0 && Math.round(this.y) % 5 === 0) {
            
            this.encontrarInimigos();
        }
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

    encontrarInimigos() {

        const inimigos = this.jogador.jogo.inimigo.inimigos;
        const len = inimigos.length;

        for (let index = 0; index < len; index += 1) {
            
            const inimigo = inimigos[index];

            if (this.y < inimigo.y + inimigo.height &&
                this.x < inimigo.x + inimigo.length &&
                this.y + this.height > inimigo.y &&
                this.x + this.width > inimigo.x) {
                
                    this.active = false;
                    this.destruir();

                    let morto = inimigo.bater();
                    this.jogador.adcionarPontuacao(morto);
                    
                    
                    break;
            }
            
        }
    }

    destruir() {
        this.active = false;
        this.aoDestruir(this);
    }
}