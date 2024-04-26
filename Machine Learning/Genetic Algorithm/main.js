//Create a guessing Monkey.
class Monkey {
    constructor(wordLength) {
        let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "]
        this.charLength = wordLength;
        this.guess = "";
        this.fitness = 0;
        this.reproductionRate = 0;
        this.xChrom = "";
        this.yChrom = "";
        //Each Monkey starts with a random guess matching the length of the phrase.
        for (let i = 0; i < this.charLength; i++) {
            this.guess += letters[Math.floor(Math.random() * letters.length)];
        }
        //We can generate their DNA that they will pass on - in this case - the first or second half of their string.
        for (let i = 0; i < Math.floor(this.guess.length / 2); i++) {
            this.xChrom += this.guess[i];
        }
        for (let i = Math.floor(this.guess.length / 2); i < this.guess.length; i++) {
            this.yChrom += this.guess[i];
        }
    }
    //Calculating how correct each Monkey is.
    calcFitness(word) {
        //Reset the fitness and reproducing validity for each run.
        this.fitness = 0;
        this.reproductionRate = 0;
        //Compare the guess with the target and give an overall fitness level.
        for (let i = 0; i < word.length; i++) {
            if (this.guess[i] === word[i]) { this.fitness++ }
        }
        //Calculate the reproduction rate.
        this.reproductionRate = Math.pow(this.fitness, 2)
    }
}


//Define the phrase to guess.
let word = "do not fear i will cover the rear.";
let wordLength = word.length;
console.log(`The phrase is ${wordLength} letters long.`);

//Create the array of guessing Monkeys.

class Zoo {
    constructor(size) {
        this.reproductionPool = [];
        this.cages = []
        this.size = size;
        for (let i = 0; i < size; i++) {
            //console.log(`Monkey number ${i + 1}.`)
            this.cages.push(new Monkey(wordLength))
            this.cages[i].calcFitness(word);
        }
    }
    //Here we want to actually create the pool of parents.
    reproduce() {
        //Until the reproduction pool is full.
        let timeout = 0
        while (this.reproductionPool.length < this.cages.length) {
            //For each cage with a Monkey in.
            for (let i = 0; i < this.cages.length - this.reproductionPool.length; i++) {
                //Pick a random number between 0 and the phrase length squared. This is the rejection method.
                let j = Math.floor(Math.random() * Math.pow(word.length, 2));
                //If the fitness is higher than that number.
                if (this.cages[i].reproductionRate > j) {
                    //Add it to the reproduction pool.
                    this.reproductionPool.push(this.cages[i])
                }
            }
            //As it may take some time to find the better Monkeys, this stops the program from eating all the RAM.
            if (timeout === 2000) { break; };
            timeout++;
        }
        //Display the reproduction pool.
        console.log(this.reproductionPool);
        //Empty the cages for the next generation.
        this.cages = [];
        //Fill the cages with the children of the reproduction pool.
        for (let i = 0; i < this.reproductionPool.length; i++) {

        }

    }
}

let whipsnade = new Zoo(20);
whipsnade.reproduce()