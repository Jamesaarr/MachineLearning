class Monkey {
    constructor(wordLength) {
        this.letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "]
        this.charLength = wordLength;
        this.guess = "";
        this.fitness = 0;
        this.reproductionRate = 0;
        this.xChrom = "";
        this.yChrom = "";
        for (let i = 0; i < this.charLength; i++) {
            this.guess += this.letters[Math.floor(Math.random() * this.letters.length)];
        }
    }
    getGenes() {
        this.xChrom = "";
        this.yChrom = "";
        for (let i = 0; i < Math.floor(this.guess.length / 2); i++) {
            this.xChrom += this.guess[i];
        }
        for (let i = Math.floor(this.guess.length / 2); i < this.guess.length; i++) {
            this.yChrom += this.guess[i];
        }
    };
    calcFitness(word) {
        this.fitness = 0;
        this.reproductionRate = 0;
        for (let i = 0; i < word.length; i++) {
            if (this.guess[i] === word[i]) { this.fitness++ }
        }
        this.reproductionRate = Math.pow(this.fitness, 2)
    };
};
class Zoo {
    constructor(size, mutationRate) {
        this.reproductionPool = [];
        this.cages = [];
        this.size = size;
        this.mutationRate = mutationRate;
        for (let i = 0; i < size; i++) {
            this.cages.push(new Monkey(wordLength))
            this.cages[i].calcFitness(word);
        }
    }
    reproduce() {
        let timeout = 0;
        this.reproductionPool = [];
        while (this.reproductionPool.length < this.cages.length) {
            for (let i = 0; i < this.cages.length - this.reproductionPool.length; i++) {
                let j = Math.floor(Math.random() * Math.pow(word.length, 2));
                if (this.cages[i].reproductionRate > j) {
                    this.reproductionPool.push(this.cages[i]);
                };
            };
            if (timeout === 2000000) { break; };
            timeout++;
        };
        for (let i = 0; i < this.reproductionPool.length; i++) {
            this.reproductionPool[i].getGenes();
        };
        this.cages = [];
        for (let i = 0; i < this.reproductionPool.length; i++) {
            let monkeyBaby = new Monkey(word.length);
            monkeyBaby.guess = "";
            let newXChrom = this.reproductionPool[Math.floor(Math.random() * this.reproductionPool.length)].xChrom;
            let newYChrom = this.reproductionPool[Math.floor(Math.random() * this.reproductionPool.length)].yChrom;
            let genes = `${newXChrom}${newYChrom}`;
            newXChrom = "";
            newYChrom = "";
            for (let i = 0; i < genes.length; i++) {
                if (Math.floor(Math.random() * 100) <= this.mutationRate) {
                    monkeyBaby.guess += monkeyBaby.letters[Math.floor(Math.random() * monkeyBaby.letters.length)]
                } else { monkeyBaby.guess += genes[i] };
            };
            monkeyBaby.getGenes();
            monkeyBaby.calcFitness(word);
            this.cages.push(monkeyBaby);
        };
    }
    reproduceUntilGuessFound() {
        let generation = 0;
        let highestFitness = 0;
        while (!this.guessFound) {
            generation++;
            if(generation === 200000){
                break;
            }
            this.reproduce();
            for (let i = 0; i < this.cages.length; i++) {
                if (this.cages[i].fitness > highestFitness) {
                    highestFitness = this.cages[i].fitness;
                }
            }

            document.getElementById("current_fitness").innerHTML = `Current Fitness: ${highestFitness}`;
            for (let i = 0; i < this.cages.length; i++) {
                if (this.cages[i].guess === word) {
                    document.getElementById("guess_found").innerHTML = `Found in: ${generation}`;
                    this.guessFound = true;
                    break;
                };
            };
        };
    };
};
let word = "unicorn";
let wordLength = word.length;
let numOfMonkeys = 10000;
let mutationRate = 30;

let whipsnade = new Zoo(numOfMonkeys,mutationRate);
document.getElementById("target").innerHTML = `The target is: ${word}`;
document.getElementById("mute_rate").innerHTML = `The mutatation rate is: ${mutationRate}`;
document.getElementById("monkey_sum").innerHTML = `There are ${numOfMonkeys} Monkeys`;

function start(){
    whipsnade.reproduceUntilGuessFound();
};