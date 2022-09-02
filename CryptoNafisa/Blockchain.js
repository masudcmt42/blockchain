const SHA256 = require('crypto-js/sha256');

/**
* @param {String} toAddress
* @param {String} fromAddress
* @param {number} amount
**/
class Transaction{
    constructor(fromAddress, toAddress, amount) {
        this.toAddress = toAddress;
        this.fromAddress = fromAddress;
        this.amount = amount;
    }
}

class Block{
     /**
   * @param {number} timestamp
   * @param {Transaction[]} transactions
   * @param {string} previousHash
   */
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
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
        this.chain = [this.createGenesisBlock()];
        this.deficalty = 4;
        this.pandingTransaction = [];
        this.mainingReward = 10;
    }
    createGenesisBlock() {
        return new Block("01//1/2022", [new Transaction(null,null,0)], "Fist");
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    mainePandingTransaction(mainarAddress) {
        let block = new Block(Date.now(), this.pandingTransaction, this.getLastBlock().hash);
        block.maineBlock(this.deficalty);
        console.log("Block is maine....");
        this.chain.push(block);
        this.pandingTransaction = [
            new Transaction(null, mainarAddress, this.mainingReward)
        ];
    }
    createTransaction(transaction) {
        this.pandingTransaction.push(transaction);
    }
    chackBalance(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (address === trans.fromAddress) {
                    balance -= trans.amount;
                }
                if (address === trans.toAddress) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
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

let cryptoNafisa = new Blockchin();
cryptoNafisa.createTransaction(new Transaction("Masud", "Nafisa", 10000));
cryptoNafisa.createTransaction(new Transaction("Sabbir", "Nafisa", 5000));
cryptoNafisa.createTransaction(new Transaction("Nafisa", "Adu", 500));
console.log("Maning Start");
cryptoNafisa.mainePandingTransaction("Sakib");

cryptoNafisa.createTransaction(new Transaction("Masud", "Nafisa", 8000));
cryptoNafisa.createTransaction(new Transaction("Sabbir", "Sakib", 5000));
console.log("Maning Start");
cryptoNafisa.mainePandingTransaction("Sakib");

console.log("Balance of Nafisa: " + cryptoNafisa.chackBalance("Nafisa"));
console.log("Balance of Adu: " + cryptoNafisa.chackBalance("Adu"));
console.log("Balance of Sakib: " + cryptoNafisa.chackBalance("Sakib"));


//console.log(JSON.stringify(cryptoNafisa, null, 5));