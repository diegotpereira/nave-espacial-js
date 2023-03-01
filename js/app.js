import Jogo from './Jogo/Jogo.js';
import Jogador from './Jogador.js';
import Combatente from './Combatente.js';

const root = document.getElementById('root');

window.root = root;

const combatente =  new Combatente();

const jogador = new Jogador({ combatente });

const jogo = new Jogo({ jogador });

// if (import.meta.env.dev) {
    
//     window.jogo = jogo;
// }