// contractCode = '6060604052341561000f57600080fd5b6101bc8061001e6000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318559e19146100c357806394707dab146100e9575b60003411156100c1577fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b005b34156100ce57600080fd5b6100e7600480803560ff16906020019091905050610127565b005b34156100f457600080fd5b61010d600480803560ff16906020019091905050610170565b604051808215151515815260200191505060405180910390f35b806000806101000a81548160ff021916908360ff1602179055507fc86aa3e5b1bc5a674de25655f9a3ccf734594e22d008e71d7ede3fe5c93e138460405160405180910390a150565b60008060009054906101000a900460ff1660ff168260ff161490509190505600a165627a7a7230582066d24a4fd7fdc2bc00e0a1fa2b1557308afc3335dff8102aa9fa63993160e1ff0029';
// contractAddress = '0x5ee5C9733CA5Fc0557308d3068EBd064A55394FE';
// GuessNumber = web3.eth.contract([{"constant":false,"inputs":[{"name":"givenNumber","type":"uint8"}],"name":"setNumber","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"givenNumber","type":"uint8"}],"name":"guessNumber","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[],"name":"SetNumber","type":"event"}]);
// GuessNumberInstance = GuessNumber.at(contractAddress);


/*

To deploy the contract on your own call:

    var contractInstance = GuessNumber.new({from: web3.eth.accounts[0], gas: 200000, data: contractCode});

To get the address use:

    contractInstance.address;

*/


/*
Set the number use:

    GuessNumberInstance.setNumber(10, {from: '0x343c98e2b6e49bc0fed722c2a269f3814ddd1533', gas: 50000})

*/


/*

To send money to the contract use:

    web3.eth.sendTransaction({from: web3.eth.accounts[0], to: '0x89a0368e0021a72987a5fa547cb1d9b235194e2e' ,value: 123000000000})

*/