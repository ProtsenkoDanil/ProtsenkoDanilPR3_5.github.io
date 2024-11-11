// pokemon.js

export class Pokemon {
    constructor({ name, healthElement, attackButton, specialButton }) {
        this.name = name;
        this.health = 100;
        this.healthElement = healthElement;
        this.attackButton = attackButton;
        this.specialButton = specialButton;
        this.enemy = null;
    }

    attack() {
        return Math.floor(Math.random() * 10) + 5;
    }

    specialAttack() {
        return Math.floor(Math.random() * 20) + 10;
    }

    updateHealthBar() {
        this.healthElement.style.width = this.health + '%';
        if (this.health <= 0) {
            this.health = 0;
            alert(`${this.name} has fainted!`);
        }
    }

    showPokeball() {
        const pokeball = document.getElementById('pokeball');
        const explosion = document.getElementById('explosion');
        
        pokeball.style.visibility = 'visible';

        const { top: attackerTop, left: attackerLeft } = this.attackButton.parentElement.getBoundingClientRect();
        const { top: targetTop, left: targetLeft } = this.enemy.attackButton.parentElement.getBoundingClientRect();

        pokeball.style.top = `${attackerTop}px`;
        pokeball.style.left = `${attackerLeft}px`;

        setTimeout(() => {
            pokeball.style.top = `${targetTop}px`;
            pokeball.style.left = `${targetLeft}px`;
        }, 50);

        setTimeout(() => {
            explosion.style.visibility = 'visible';
            explosion.style.top = `${targetTop}px`;
            explosion.style.left = `${targetLeft}px`;
            pokeball.style.visibility = 'hidden';
        }, 800);

        setTimeout(() => {
            explosion.style.visibility = 'hidden';
        }, 1000);
    }

    battle(isSpecial = false) {
        if (window.isAttacking) return;
        window.isAttacking = true;
        this.showPokeball();

        const damage = isSpecial ? this.specialAttack() : this.attack();
        this.enemy.health -= damage;
        if (this.enemy.health < 0) this.enemy.health = 0;

        this.enemy.updateHealthBar();
        addLog(`${this.name} used ${isSpecial ? 'Special Attack' : 'Attack'} on ${this.enemy.name}. Damage: ${damage}. ${this.enemy.name} has ${this.enemy.health} HP left.`);

        setTimeout(() => (window.isAttacking = false), 1000);
    }
}

export const addLog = (message) => {
    const logs = document.getElementById('logs');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logs.prepend(logEntry);
};
