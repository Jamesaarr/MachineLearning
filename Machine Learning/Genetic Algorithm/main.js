//Create a guessing Monkey.
class Monkey {
    constructor(wordLength) {
        this.letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "]
        this.charLength = wordLength;
        this.guess = "";
        this.fitness = 0;
        this.reproductionRate = 0;
        this.xChrom = "";
        this.yChrom = "";

        //Each Monkey starts with a random guess matching the length of the phrase.
        for (let i = 0; i < this.charLength; i++) {
            this.guess += this.letters[Math.floor(Math.random() * this.letters.length)];
        }
    }
    getGenes() {
        this.xChrom = "";
        this.yChrom = ""
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



//Create the array of guessing Monkeys.

class Zoo {
    constructor(size, mutationRate) {
        this.reproductionPool = [];
        this.cages = []
        this.size = size;
        this.mutationRate = mutationRate
        for (let i = 0; i < size; i++) {
            this.cages.push(new Monkey(wordLength))
            this.cages[i].calcFitness(word);
        }
    }
    //Here we want to actually create the pool of parents.
    reproduce() {
        //Until the reproduction pool is full.
        let timeout = 0;
        this.reproductionPool = [];
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
            if (timeout === 2000000) { break; };
            timeout++;
        }
        //Display the reproduction pool.
        //console.log(this.reproductionPool);
        //Collect the genes of the pool.
        for (let i = 0; i < this.reproductionPool.length; i++) {
            this.reproductionPool[i].getGenes();
        }
        console.log(this.cages);
        //Empty the cages for the next generation.
        this.cages = [];
        //Fill the cages with the children of the reproduction pool.
        for (let i = 0; i < this.reproductionPool.length; i++) {
            //Create Monkey Baby
            let monkeyBaby = new Monkey(word.length);
            //Clear default Guess
            monkeyBaby.guess = "";
            //Copy Chromosomes from each parent.
            let newXChrom = this.reproductionPool[Math.floor(Math.random() * this.reproductionPool.length)].xChrom;
            let newYChrom = this.reproductionPool[Math.floor(Math.random() * this.reproductionPool.length)].yChrom;
            let genes = `${newXChrom}${newYChrom}`;
            newXChrom = "";
            newYChrom = "";

            //Mutation - This will either mutate the gene or will pass the gene through.
            for (let i = 0; i < genes.length; i++) {
                console.log(monkeyBaby.guess);
                if (Math.floor(Math.random() * 100) <= this.mutationRate) {
                    monkeyBaby.guess += monkeyBaby.letters[Math.floor(Math.random() * monkeyBaby.letters.length)]
                } else { monkeyBaby.guess += genes[i] }
            }





            //Need to add an update to the chromosomes. I ended up creating a seperate function for this.
            monkeyBaby.getGenes();
            //Calculate new Monkey's fitness.
            monkeyBaby.calcFitness(word);
            //Save the new Monkeys to the cage.
            this.cages.push(monkeyBaby);
        }
    console.log(this.reproductionPool)
    }
    reproduceUntilGuessFound() {
        let generation = 0;
        let highestFitness = 0;
        while (!this.guessFound) {
            generation++;
            if(generation === 3){
                console.log(`Guess not found in generation ${generation}`);
                break;
            }
            //console.log(`Generation ${generation}:`);
            this.reproduce();

            // Find the highest fitness in the current generation
            for (let i = 0; i < this.cages.length; i++) {
                if (this.cages[i].fitness > highestFitness) {
                    highestFitness = this.cages[i].fitness;
                }
            }

            //console.log(`Highest Fitness: ${highestFitness}`);

            for (let i = 0; i < this.cages.length; i++) {
                if (this.cages[i].guess === word) {
                    //console.log(`Guess found in generation ${generation}: ${this.cages[i].guess}`);
                    this.guessFound = true;
                    break;
                }
            }
        }
    }
}
//Define the phrase to guess.
let word = "unicorn";
let wordLength = word.length;
//How many monkeys.
let numOfMonkeys = 5;
//Mutation rate.
let mutationRate = 100;
console.log(`The phrase is ${wordLength} letters long.`);
console.log(`There are ${numOfMonkeys} monkeys in the zoo.`)
console.log(`The Mutation Rate is ${mutationRate}%.`)


let whipsnade = new Zoo(numOfMonkeys,mutationRate);

//How many generations to test - for some reason the program 
whipsnade.reproduceUntilGuessFound();


//Note: - The current issue is the mutation not working and not actually mutating the guesses - meaning it gets stuck inbreeding
//Check for console.logs for troubleshooting.