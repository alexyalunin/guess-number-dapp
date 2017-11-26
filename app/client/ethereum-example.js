
Session.setDefault('latestBlock', 'wait for the block...');


Template['testButton'].events({
    'click button.deploy': function (e, template) {
        var contractInstance = GuessNumber.new({from: web3.eth.accounts[0], gas: 300000, data: contractCode},
            function (err, res) {
                alert(res);
                //alert(contractInstance.address);
                console.log(res);
                //console.log(contractInstance.address);
                //contractAddress = contractInstance.address;
            }
        );
    },
    'click button.send': function (e, template) {
        web3.eth.sendTransaction({from: web3.eth.accounts[0],
            gas: 300000,
            to: GuessNumberInstance.address,
            value: template.find('input').value
        }, function (err, res) {
            alert(res);
        });
    },
});


Template['blockchainStatus'].helpers({
    currentBlock: function () {
        return JSON.stringify(Session.get('latestBlock'), null, 2);
    }
});


Template['deposits'].helpers({
    deposits: function () {
        return Deposits.find({},{sort: {blockNumber: -1}});
    },
    value: function(){
        return web3.fromWei(this.value, 'ether') + ' ether';
    }
});


Template['guessNumber'].events({
    'click button.guess': function (e, template) {
        // alert(template.find('input').value +' is '+ GuessNumberInstance.guessNumber(template.find('input').value));
        // template.find('input').value = '';
        GuessNumberInstance.guessNumber(template.find('input').value, function (err, res) {
            alert(template.find('input').value +' is ' + res);
            template.find('input').value = '';
        });
    },
    'click button.set': function (e, template) {
        GuessNumberInstance.setNumber(template.find('input').value,
            {from: web3.eth.accounts[0], gas: 50000},
            function (err, res) {
                //Session.set('latestBlock', res);
                //alert(res);
                template.find('input').value = '';
            }
        );
    },
    'click a.switch': function (e, template) {
        TemplateVar.set('setNumber', !TemplateVar.get('setNumber'));
    }
});