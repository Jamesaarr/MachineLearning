/*Author - James Ritchie 
Date - 2024*/
function sigmoid(x){
    return 1/ (1+ Math.exp(-x));
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes){
        //Build the network.
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.weights_input = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_hidden = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_input.randomize();
        this.weights_hidden.randomize();
        this.bias_hidden = new Matrix(this.hidden_nodes,1);
        this.bias_output = new Matrix(this.output_nodes,1);
        this.bias_hidden.randomize();
        this.bias_output.randomize();
    }
    feedforward(input_array){
        //LOTS OF MATRIX MATH!!
        //Generating hidden outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = this.weights_input.multiplyMatrix(inputs);
        hidden.add(this.bias_hidden);
        //Activation Function
        hidden.map(sigmoid);
        //Generating the outputs
        let output = this.weights_hidden.multiplyMatrix(hidden);
        output.add(this.bias_output);
        output.map(sigmoid);
        //Sending back to the caller
        return output.toArray();
    }
    train(inputs, answer){
        return undefined;
    }
}