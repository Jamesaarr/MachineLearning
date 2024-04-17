/*Author - James Ritchie 
Date - 2024*/
class Perceptron {
    constructor() {
        this.weights = new Array(2);
        this.learningRate = 0.1;
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
    train(inputs,target){
        let guess = this.guess(inputs);
        console.log(this.weights);
        console.log(guess);
        let error = target - guess;
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] += error * inputs[i] * this.learningRate;
        }
    }
}
class point{
    constructor(){
        this.x = Math.random() * 99 - 1;
        this.y = Math.random() * 99 - 1;
        this.label = 0;
        if (this.x > this.y){this.label = 0} else {this.label = 1}
    }
}
let neuron = new Perceptron();
for(let i = 0; i < 20; i++){
    let mark  = new point();
    neuron.train([mark.x,mark.y],mark.label);
    console.log(mark.label);
    console.log("________");
}