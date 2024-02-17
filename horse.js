class Calculator {

    constructor(prevTextElement, currTextElement) {
        this.prevTextElement = prevTextElement;
        this.currTextElement = currTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        this.updateDisplay()
    }

    del() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if ( this.operation === "" ) return;
        if ( this.previousOperand !== "" ) {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const a = parseFloat(this.currentOperand)
        const b = parseFloat(this.previousOperand)
        if (isNaN(a) || isNaN(b)) return

        switch(this.operation) {
            case '+':
                result = a + b
                break
            case '*':
                result = a * b
                break
            case '-':
                result = b - a
                break
            case '/':
                result = b / a
                break
            default:
                return
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
        //this.previousOperand = this.getDisplayNumber(result);
   
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if (decimalDigits != null) {
            return `${integerDisplay},${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.prevTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.prevTextElement.innerText = '';
        }
    }

}

const numberButtons = document.querySelectorAll('[data-numb]')
const opButtons = document.querySelectorAll('[data-operation]')
const eqButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-del]')
const clearButton = document.querySelector('[data-clear]')
const prevTextElement= document.querySelector('[data-previous]')
const currTextElement = document.querySelector('[data-current]')

const calc = new Calculator(prevTextElement, currTextElement)

numberButtons.forEach((b) => {
    b.addEventListener('click', () => {
        calc.addNumber(b.innerText);
        calc.updateDisplay();
    })
})

opButtons.forEach((b) => {
    b.addEventListener('click', () => {
        calc.chooseOperation(b.innerText);
        calc.updateDisplay();
    })
})

eqButton.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
})

delButton.addEventListener('click', () => {
    calc.del();
    calc.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
})

