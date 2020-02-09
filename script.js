new Vue({
    el: '#root',
    data: {
        healthPlayer: 100,
        overHeal: 0,
        healthMonster: 100,
        logs: [],
        showBattle: true,
    },
    methods: {
        restart() {
            this.logs = [];
            this.healthMonster = 100;
            this.healthPlayer = 100;
            this.overHeal = 0;
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        makeLog(pDamage, pHeal, mDamage) {
            if(pDamage === 0) {
                this.logs.push('You heal yourself on ' + pHeal + ' health points. Monster hit you on ' + mDamage + ' health points.');
            } else {
                this.logs.push('You hit monster on ' + pDamage + ' health points. Monster hit you on ' + mDamage + ' health points.');
            }
        },
        showTotal() {
            if(this.healthPlayer <= 0 && this.healthMonster <= 0) {
                this.logs.push('You died, but monster died too');
                this.showBattle = false;
            } else if(this.healthPlayer <= 0) {
                this.logs.push('You died');
                this.showBattle = false;
            } else if(this.healthMonster <= 0) {
                this.logs.push('You won! Congratulations!');
                this.showBattle = false;
            } else if(this.logs.length >= 20) {
                this.logs.push('You died of old age.');
                this.healthPlayer = 0;
                this.showBattle = false;
            }
        },
        monsterAttack(pDamage, pHeal) {
            let mDamage = this.getRandomInt(7, 14);
            if (this.overHeal > 0) {
                this.healthPlayer = this.overHeal + this.healthPlayer - mDamage;
                if(this.healthPlayer < 100) {
                    this.overHeal = 0;
                }
            } else {
                this.healthPlayer = this.healthPlayer - mDamage;
            }
            this.makeLog(pDamage, pHeal, mDamage);
            this.showTotal();
        },
        attack() {
            let damage = this.getRandomInt(6, 12);
            this.healthMonster = this.healthMonster - damage;
            this.monsterAttack(damage, 0);
        },
        crazyHit() {
            let damage = this.getRandomInt(1, 24);
            this.healthMonster = this.healthMonster - damage;
            this.monsterAttack(damage, 0);
        },
        heal() {
            let heal = this.getRandomInt(9, 18);
            this.healthPlayer = this.healthPlayer + heal;
            this.monsterAttack(0, heal);
            if(this.healthPlayer > 100) {
                this.overHeal = this.healthPlayer - 100;
                this.healthPlayer = 100;
            }
        },
        giveUp() {
            this.healthPlayer = 0;
            this.monsterAttack(0, 0);
        },
    },
    computed: {

    },
});