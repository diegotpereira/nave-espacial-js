import Jogo from './Jogo/Jogo.js';
import Jogador from './Jogador.js';

const root = document.getElementById('root');

window.root = root;

const jogador = new Jogador();

const jogo = new Jogo({ jogador });

// if (import.meta.env.dev) {
    
//     window.jogo = jogo;
// }