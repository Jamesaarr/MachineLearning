/*Author - James Ritchie 
Date - 2024*/
class Matrix {
constructor(rows,cols){
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for(let i = 0; i < this.rows; i++){
        this.matrix[i] = [];
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] = 0;
        }
    }
}
map(func){
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            let val = this.matrix[i][j];
            this.matrix[i][j] = func(val);
        }
    }
}
toArray(){
    let arr = [];
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            arr.push(this.matrix[i][j]);
        }
    }
    return arr;
}
static fromArray(arr){
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.lenth; i++){
        m.matrix[i][0] = arr[i];
    }
    return m;
}
randomize(){
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] = Math.floor(Math.random() * 10);
        }
    }
}
multiply(n){
    if(n instanceof Matrix){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.matrix[i][j] *= n.matrix[i][j];
            }
        }
    }else{
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] *= n;
        }
    }
}
}
divide(n){
    if(n instanceof Matrix){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.matrix[i][j] /= n.matrix[i][j];
            }
        }
    }else{
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] /= n;
        }
    }
}
}
add(n){
    if(n instanceof Matrix){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.matrix[i][j] += n.matrix[i][j];
            }
        }
    }else{
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] += n;
        }
    }
}
}
subtract(n){
    if(n instanceof Matrix){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.matrix[i][j] -= n.matrix[i][j];
            }
        }
    }else{
    for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.cols; j++){
            this.matrix[i][j] -= n;
        }
    }
}
}
transpose(){
    let result = new Matrix(this.cols, this.rows);
    for(let i = 0; i < result.rows; i++){
        for(let j = 0; j < result.cols; j++){
            result.matrix[i][j] = this.matrix[j][i];
        }
    }
    return result;
}
multiplyMatrix(n){
    if(n instanceof Matrix){
        if(this.cols != n.rows){
            console.log("Cols of A must match rows of B!");
            return undefined;
        }else{
            let result = new Matrix(this.rows, n.cols);
            for(let i = 0; i < result.rows; i++){
                for(let j = 0; j < result.cols; j++){
                    let sum = 0;
                    for(let k = 0; k < this.cols; k++){
                        sum += this.matrix[i][k] * n.matrix[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
            return result;
        }  
    }else{
        console.log(`${n} Is not a Matrix`);
        return undefined;
}
}
print(){
    console.table(this.matrix);
}
}