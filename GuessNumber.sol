contract GuessNumber{
    
    uint8 number;
    
    event Deposit(address from, uint value);
    event NumberWasSet();

    function() payable {
        if (msg.value > 0) {
            Deposit(msg.sender, msg.value);
        }
    }
    
    function setNumber(uint8 givenNumber) {
        number = givenNumber;
        NumberWasSet();
    }
    
    function guessNumber(uint8 givenNumber) constant returns (bool) {
        return (givenNumber == number);
    }
}