/*Author - James Ritchie 
Date - 2024*/
class Perceptron {
    constructor() {
        this.weights = new Array(2);
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = Math.random() * 2 - 1;
        }
    }
    
    sign(n) {
        if (n >= 0) {
            return 1;
        } else {
            return 0;
        }
    }
    
    guess(inputs) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        let output = this.sign(sum);
        return output;
    }
}

let inputs = [-1, 0.5];
let neuron = new Perceptron();
console.log(neuron.guess(inputs));
