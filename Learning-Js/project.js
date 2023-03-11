// I am following the tutorial: https://www.youtube.com/watch?v=E3XxeE7NF30&t=539s
// 1. Deposit money
// 2. Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin slot machine
// 5. Check if user won
// 6. Give user winnings if they won. If not take their bet
// 7. Play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 3,
    B: 3,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

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
};

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
};

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
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let x = 0; x < COLS; x++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[x].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([])
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows
}
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != rows.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () => {
    let Balance = deposit();

    while (true) {
        console.log("You have a balance of $" + Balance)
        const LinesAmount = GetNumberOfLines();
        const Bet = GetBet(Balance, LinesAmount);
        Balance -= Bet * LinesAmount
        const reels = spin();
        const rows = transpose(reels);
        console.log("----- -----")
        printRows(rows);
        console.log("----- -----")
        const winnings = getWinnings(rows, Bet, LinesAmount)
        Balance += winnings;
        console.log("You won, $" + winnings.toString())

        if (Balance <= 0) {
            console.log("You ran out of money! ")
            break
        }

        const playAgain = prompt("Do you want to play again? (y/n ")

        if (playAgain != "y") break;
    }
}

game();