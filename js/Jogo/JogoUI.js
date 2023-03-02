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

        this.criarIndicadoresInferioresDireita();

        this.criarIndicadoresInferioresEsquerdo();

        this.criarMenu();

        this.criarFimJogo();

        this.criarEstrelas();

        this.addEventos();
    }

    addEventos() {

        const resize = () => {

            this.DOM.canvas.width = window.innerWidth;
            this.DOM.canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);

        resize();
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

    criarIndicadoresInferioresDireita() {

        const elemento = createDomNode('indicadores-botao-direito');

        this.DOM.balasContar = addDomNode(elemento, {

            className: 'contador-balas'
        });

        this.DOM.balasRestantes = addDomNode(this.DOM.balasContar, {

            className: 'icon'
        });

        this.DOM.balasCapacidade = addDomNode(this.DOM.balasContar, {

            className: 'subtitulo'
        });

        this.DOM.trovao = addDomNode(elemento, { className: 'indicador-trovao'});
        addDomNode(this.DOM.trovao, { className: 'icon', tag: 'span'});
        addDomNode(this.DOM.trovao, {

            className: 'subtitulo',
            tag: 'kbd',
            text: 'ENTRE'
        });

        root.appendChild(elemento);
    }

    criarIndicadoresInferioresEsquerdo() {

        const elemento = createDomNode('indicadores-botao-esquerdo');
        const textos = addDomNode(elemento, { className: 'textos'});

        this.DOM.nivelJogo = addDomNode(textos, { className: 'nivel'});
        addDomNode(this.DOM.nivelJogo, {

            className: 'label',
            tag: 'span',
            text: 'Nivel: '
        });

        this.DOM.nivel = addDomNode(this.DOM.nivelJogo, {

            className: 'valor',
            tag: 'span',
            text: '0'
        });

        this.DOM.pontuacaoJogo = addDomNode(textos, { className: 'pontuacoes'});
        addDomNode(this.DOM.pontuacaoJogo, {

            className: 'label',
            tag: 'span',
            text: 'Pontuacao: '
        });

        this.DOM.pontuacao = addDomNode(this.DOM.pontuacaoJogo, {

            className: 'valor',
            tag: 'span'
        });

        this.DOM.vidaJogo = addDomNode(elemento, { className: 'vida'});
        this.DOM.progresso = addDomNode(this.DOM.vidaJogo, {

            className: 'progresso'
        });

        this.DOM.vida = addDomNode(this.DOM.progresso, {

            className: 'valor',
            tag: 'span'
        });

        this.DOM.vidaTexto = addDomNode(this.DOM.vidaJogo, {

            className: 'texto',
            tag: 'span'
        });

        root.appendChild(elemento);
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
            text: 'Pressione ENTER para Jogar'
        });

        root.appendChild(elemento);
    }

    exibirMenu() {

        this.DOM.menu.classList.remove('hidden');
    }

    criarFimJogo() {

        const elemento = createDomNode('modal fim-jogo');

        elemento.classList.add('hidden');
        this.DOM.fimJogo = elemento;

        const content = addDomNode(elemento, { className: 'content'});

        this.FIMJOGO_TITULO = addDomNode(content, {

            className: 'titulo',
            tag: 'h1',
            text: 'Fim de Jogo'
        });

        addDomNode(content, {

            className: 'subtitulo',
            tag: 'h2',
            text: 'Pressione ENTER para começar de novo'
        });

        this.DOM.FIMJOGO_PONTUACAO = addDomNode(content, {

            className: 'pontuacao',
            tag: 'p',
            text: 'Sua pontuação: 0'
        });

        this.DOM.FIMJOGO_MELHOR = addDomNode(content, {

            className: 'pontuação melhor',
            tag: 'p',
            text: 'Melhor Pontuação: 0'
        });

        this.DOM.GAMEOVER_SHARE_TWITTER = addDomNode(content, {

            tag: 'div',
        }), {

            className: 'compartilhar-twitter',
            tag: 'a',
            text: 'Tweet agora',
        }

        this.DOM.FIMJOGO_MELHOR_REINICIAR = addDomNode(addDomNode(content, {

            tag: 'div',
        }), {

            className: 'reiniciar',
            tag: 'button',
            text: 'Comece de novo'
        })

        this.DOM.GAMEOVER_SHARE_TWITTER.target = '_blank';

        root.appendChild(elemento);
    }

    exibirFimDeJogo({nivel, pontuacao, melhor, eh_novo_recorde}) {

        this.DOM.FIMJOGO_TITULO.textContent = eh_novo_recorde

        ? 'Novo Recorde'
        :   'Fim de Jogo'

        this.DOM.FIMJOGO_PONTUACAO.textContent = `Sua pontuação: ${pontuacao}`;
        this.DOM.FIMJOGO_MELHOR.textContent = `Sua melhor: ${melhor}`;

        this.DOM.FIMJOGO_COMPARTILHAR_TWITTER = 

        'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(
            `Spacecraft ${nivel}/${pontuacao}${
            is_new_record ? '\r\nNew Record!' : ''
            }\r\nhttps://spacecraft.vercel.app/`,
        )

        this.DOM.fimJogo.classList.toggle('success', eh_novo_recorde);
        this.DOM.fimJogo.classList.remove('hidden');
    }

    ocultarModais() {

        this.DOM.menu.classList.add('hidden');
        this.DOM.fimJogo.classList.add('hidden');
    }
}