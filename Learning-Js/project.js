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
            console.log("Invalid deposit amount, try again ");
        }
        else {
            return Float_DepositAmount;
        }
    }

}

const GetNumberOfLines = () => {
    while (true) {
        const Lines = prompt("Enter number of lines to bet on (1-3): ");
        const NumberOfLines = parseFloat(Lines);

        if (isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3) {
            console.log("Invalid number of lines, try again ");
        }
        else {
            return NumberOfLines;
        }
    }
}

const GetBet = (Balance, Lines) => {
    while (true) {
        const Bet = prompt("Enter bet per line: ");
        const NumberBet = parseFloat(Bet);

        if (isNaN(NumberBet) || NumberBet <= 0 || NumberBet > Balance / Lines) {
            console.log("Invalid bet, try again ");
        }
        else {
            return NumberBet;
        }
    }
}


let Balance = deposit();
const LinesAmount = GetNumberOfLines()
const Bet = GetBet(Balance, LinesAmount);