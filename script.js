Calc = {
    add: function(a,b) {return a + b;},
    sub: function(a,b) {return a - b;},
    mlt: function(a,b) {return a * b;},
    div: function(a,b) {return a / b;},
}

function operate(operator, a, b) {
    return operator(a,b);
}

let displayValue = "";
let func = "";
let inputs = [];
let value;
let buttonSequence = [];

const equals = document.querySelector('#eq');
equals.addEventListener('click', () => {
    addToButtonSequence('eq');
    if (inputs.length == 0) {
        return;
    }

    value = parseFloat(displayValue);

    inputs.push(value);
    value = operate(Calc[func],inputs[0],inputs[1]);
    displayOnScreen(value);
    inputs.length = 0;

    displayValue = value;
})

const operators = document.querySelectorAll('.operators');
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        addToButtonSequence(operator.id);
        if (backToBackOperators() == true) {
            return;
        } 

        value = parseFloat(displayValue);

        if (inputs.length == 0) {
            inputs.push(value);
        } else if (inputs.length == 1) {
            inputs.push(value);
            value = operate(Calc[func],inputs[0],inputs[1]);
            displayOnScreen(value);
            inputs.pop();
            inputs[0] = value;
        }

        displayValue = "";
        func = operator.id;
    })
})

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        addToButtonSequence(number.id);
        displayValue += number.id;
        displayOnScreen(displayValue);
    })
})

const clear = document.getElementById('AC');
clear.addEventListener('click', () => {
    displayValue = "";
    displayOnScreen("0");
    inputs.length = 0;
    buttonSequence.length = 0;
})

function addToButtonSequence(buttonId) {
    buttonSequence.push(buttonId);
    
    if (buttonSequence.length > 2) {
        buttonSequence.shift();        
    }
}

function backToBackOperators() {
    if ((buttonSequence[1] == "mlt" || buttonSequence[1] == "sub" || 
        buttonSequence[1] == "add" || buttonSequence[1] == "div") &&  
        (buttonSequence[0] == buttonSequence[1])) {
        return true;
    }

    return false;
}

function displayOnScreen(text) {
    document.getElementById('screen').value = text;
}

