// I am following the tutorial: https://www.youtube.com/watch?v=E3XxeE7NF30&t=539s
// 1. Deposit money
// 2. Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin slot machine
// 5. Check if user won
// 6. Give user winnings if they won. If not take their bet
// 7. Play again

const prompt = require("prompt-sync")();

const deposit = () => {
    while (true) {
        const DepositAmount = prompt("Enter a deposit amount: ");
        const Float_DepositAmount = parseFloat(DepositAmount);

        if (isNaN(Float_DepositAmount) || Float_DepositAmount <= 0) {
            console.log("Invalid deposit amount, try again ")
        }
        else {
            return Float_DepositAmount
        }
    }

}

const DepositAmount = deposit();
console.log(DepositAmount)