const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.date = data;
        this.previousHash=previousHash;
    }
    claculateHash() {
        return SHA256(this.index+this.timestamp+JSON.stringify(this.data)+this.previousHash).toString();
    }
}

class Blockchin{
    constructor() {
        this.chain = [this.createGenesisBlock];
    }
    createGenesisBlock() {
        return new Block(0, "01//1/2022", "genesis Block", "Fist");
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.claculateHash();
        this.chain.push(newBlock);
    }
    ChainValidation() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.claculateHash()) {
                return false;
            }
            
            if (currentBlock.previousHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
        
    }
}

let Mcoin = new Blockchin()
Mcoin.addNewBlock(new Block(1, "1/01/2022", { amount: 10 }));
Mcoin.addNewBlock(new Block(2, "1/01/2022", { amount: 40 }));
Mcoin.addNewBlock(new Block(3, "1/01/2022", { amount: 50 }));
console.log("is chain valid " + Mcoin.ChainValidation());

console.log(JSON.stringify(Mcoin, null, 4));