// main.js
import { Pokemon, addLog } from './pokemon.js';

const pikachu = new Pokemon({
    name: 'Pikachu',
    healthElement: document.getElementById('health1'),
    attackButton: document.getElementById('attack1'),
    specialButton: document.getElementById('special1')
});

const charmander = new Pokemon({
    name: 'Charmander',
    healthElement: document.getElementById('health2'),
    attackButton: document.getElementById('attack2'),
    specialButton: document.getElementById('special2')
});

pikachu.enemy = charmander;
charmander.enemy = pikachu;

window.isAttacking = false;

pikachu.attackButton.addEventListener('click', () => {
    pikachu.battle();
});

pikachu.specialButton.addEventListener('click', () => {
    pikachu.battle(true);
});

charmander.attackButton.addEventListener('click', () => {
    charmander.battle();
});

charmander.specialButton.addEventListener('click', () => {
    charmander.battle(true);
});
