import Game from './game';

window.game = new Game('canvas', 'score')

document.getElementById('js-start-trigger').addEventListener('click', () => {game.start();})