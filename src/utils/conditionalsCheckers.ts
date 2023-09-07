export const checkWinningCondition = (board: string[], sqrtOfBoard: number) => {
    const horizontalWinner = ['x', 'o'].find((checkSymbol) => {
        for (let row = 0; row < sqrtOfBoard; row++) {
            let consecutiveCount = 0
            for (let col = 0; col < sqrtOfBoard; col++) {
                const index = row * sqrtOfBoard + col
                if (board[index] === checkSymbol) {
                    consecutiveCount++
                    if (
                        (consecutiveCount >= 5 && sqrtOfBoard >= 5) ||
                        consecutiveCount === sqrtOfBoard
                    ) {
                        return true
                    }
                } else {
                    consecutiveCount = 0
                }
            }
        }
        return false
    })

    const verticalWinner = ['x', 'o'].find((checkSymbol) => {
        for (let col = 0; col < sqrtOfBoard; col++) {
            let consecutiveCount = 0
            for (let row = 0; row < sqrtOfBoard; row++) {
                const index = col + row * sqrtOfBoard
                if (board[index] === checkSymbol) {
                    consecutiveCount++
                    if (
                        (consecutiveCount >= 5 && sqrtOfBoard >= 5) ||
                        consecutiveCount === sqrtOfBoard
                    ) {
                        return true
                    }
                } else {
                    consecutiveCount = 0
                }
            }
        }
        return false
    })

    return horizontalWinner || verticalWinner
}

export const checkDiagonal = (
    diagonal: string[],
    sqrtOfBoard: number,
    onWinner: (arg: string) => void
) => {
    const symbolsToCheck = ['x', 'o']

    for (const symbol of symbolsToCheck) {
        let consecutiveCount = 0
        let maxConsecutiveCount = 0

        for (const cell of diagonal) {
            if (cell === symbol) {
                consecutiveCount++
                if (consecutiveCount >= 5 && sqrtOfBoard >= 5) {
                    onWinner(symbol)
                    return
                }
                if (consecutiveCount > maxConsecutiveCount) {
                    maxConsecutiveCount = consecutiveCount
                }
            } else {
                consecutiveCount = 0
            }
        }

        if (maxConsecutiveCount === sqrtOfBoard) {
            onWinner(symbol)
            return
        }
    }
}

export const checkAdditionalDiagonals = (
    sqrtOfBoard: number,
    board: string[],
    onWinner: (arg: string) => void
) => {
    if (sqrtOfBoard >= 6) {
        for (let offset = 1; offset <= sqrtOfBoard - 5; offset++) {
            const additionalDiagonal1 = []
            const additionalDiagonal2 = []
            for (
                let i = offset;
                i < board.length - sqrtOfBoard * (5 - offset) + offset;
                i += sqrtOfBoard + 1
            ) {
                additionalDiagonal1.push(board[i])
            }
            for (
                let i = sqrtOfBoard - offset - 1;
                i < board.length - sqrtOfBoard - 1;
                i += sqrtOfBoard - 1
            ) {
                additionalDiagonal2.push(board[i])
            }

            checkDiagonal(additionalDiagonal1, sqrtOfBoard, onWinner)
            checkDiagonal(additionalDiagonal2, sqrtOfBoard, onWinner)
        }

        for (let offset = 1; offset <= sqrtOfBoard + 5; offset++) {
            const additionalDiagonal1 = []
            const additionalDiagonal2 = []
            for (
                let i = offset;
                i < board.length - sqrtOfBoard * (5 + offset) + offset;
                i += sqrtOfBoard + 1
            ) {
                additionalDiagonal1.push(board[i])
            }
            for (
                let i = sqrtOfBoard - offset + 1;
                i < board.length + sqrtOfBoard + 1;
                i += sqrtOfBoard - 1
            ) {
                additionalDiagonal2.push(board[i])
            }
            checkDiagonal(additionalDiagonal1, sqrtOfBoard, onWinner)
            checkDiagonal(additionalDiagonal2, sqrtOfBoard, onWinner)
        }
    }
}
