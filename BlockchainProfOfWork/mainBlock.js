const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.date = data;
        this.previousHash = previousHash;
        this.nose = 0;
        this.hash=this.claculateHash();
    }
    claculateHash() {
        return SHA256(this.index+this.timestamp+JSON.stringify(this.data)+this.previousHash +this.nose).toString();
    }

    maineBlock(deficalty) {
        while(this.hash.substring(0, deficalty) !== Array(deficalty + 1).join("0")) {
            this.nose++;
            this.hash=this.claculateHash();
        }
        console.log("Block maine Hash: " + this.hash);
    }
}

class Blockchin{
    constructor() {
        this.chain = [this.createGenesisBlock];
        this.deficalty = 4;
    }
    createGenesisBlock() {
        return new Block(0, "01//1/2022", "genesis Block", "Fist");
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.maineBlock(this.deficalty);
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
console.log("Start maining block 1........");
Mcoin.addNewBlock(new Block(1, "1/01/2022", { amount: 10 }));
console.log("Start maining block 2........");
Mcoin.addNewBlock(new Block(2, "1/01/2022", { amount: 40 }));
console.log("Start maining block 3........");
Mcoin.addNewBlock(new Block(3, "1/01/2022", { amount: 50 }));
console.log("is chain valid " + Mcoin.ChainValidation());

console.log(JSON.stringify(Mcoin, null, 4));