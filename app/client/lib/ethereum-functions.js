if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


contractCode = '6060604052341561000f57600080fd5b6101bc8061001e6000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318559e19146100c357806394707dab146100e9575b60003411156100c1577fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b005b34156100ce57600080fd5b6100e7600480803560ff16906020019091905050610127565b005b34156100f457600080fd5b61010d600480803560ff16906020019091905050610170565b604051808215151515815260200191505060405180910390f35b806000806101000a81548160ff021916908360ff1602179055507f4bbf2a95b8a1b0106078ab03fae6e70488f9b23dfd9c007e7e9f6058cc55233c60405160405180910390a150565b60008060009054906101000a900460ff1660ff168260ff161490509190505600a165627a7a723058207425dab0e16e41f88c15ec8482eb577cb485c5d9873aaa4575c5a8cbcf5569760029';
contractAddress = '0xe3e6903955daee2caf6a7acac5b04c1c09ee1198';
GuessNumber = web3.eth.contract([{"constant":false,"inputs":[{"name":"givenNumber","type":"uint8"}],"name":"setNumber","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"givenNumber","type":"uint8"}],"name":"guessNumber","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[],"name":"NumberWasSet","type":"event"}]);
GuessNumberInstance = GuessNumber.at(contractAddress);



// get the latest block
web3.eth.filter('latest').watch(function(e, blockHash) {
    if(!e) {
        web3.eth.getBlock(blockHash, function(e, block){
            Session.set('latestBlock', block);
            console.log("new block" + block.number);
        });
    } else {
        alert(e);
    }
});

depositEvent = GuessNumberInstance.Deposit({},{fromBlock: 0, toBlock: 'latest'});

// Check if money arrived
// Note checking from block 0 is very unperformant!
depositEvent.watch(function(e, log) {
    if(!e) {
        console.log('Money arrived! From:'+ log.args.from, log.args.value.toString(10));

        // add the transaction to our collection
        Deposits.upsert('tx_'+ log.transactionHash ,{
            from: log.args.from,
            value: log.args.value.toString(10),
            blockNumber: log.blockNumber
        });
    }
});


setNumberEvent = GuessNumberInstance.NumberWasSet({},'latest');

// Check if somebody set a number
setNumberEvent.watch(function(err, res) {
    if(!err) {
        console.log('A new number was set on block #'+ res.blockNumber);
        alert('A new number was set on block #'+ res.blockNumber + ' Try to guess!');
    }
});



//
// CoursetroContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getInstructor","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_age","type":"uint256"},{"name":"_fName","type":"string"},{"name":"_lName","type":"string"}],"name":"setInstructor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getInstructors","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"instructorAccts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countInstructors","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"fName","type":"string"},{"indexed":false,"name":"lName","type":"string"},{"indexed":false,"name":"age","type":"uint256"}],"name":"instructorInfo","type":"event"}]);
//
// Coursetro = CoursetroContract.at('0x5bf98f943992a0623cfc361b9db288ddcc21cf93');
// console.log(Coursetro);
//
// instructorEvent = Coursetro.instructorInfo({},'latest');
//
// instructorEvent.watch(function (err, result) {
//     if (!err) {
//         console.log(result.args.fName + ' ' + result.args.lName + ' (' + result.args.age + ' years old)');
//     }
// });
//
// Coursetro.countInstructors(function (err, res) {
//     if (res) {
//         console.log(res.c + ' Instructors');
//     };
// });
