import {
    checkAdditionalDiagonals,
    checkDiagonal,
    checkWinningCondition,
} from '../utils/conditionalsCheckers'

const useWinningConditions = (
    board: string[],
    sqrtOfBoard: number,
    onWinner: (winner: string) => void
) => {
    const checkVerticalWinner = () => {
        const verticalWinner: string[][] = []

        for (let i = 0; i < sqrtOfBoard; i++) {
            const vertical = []
            for (let j = i; j < board.length; j += sqrtOfBoard) {
                vertical.push(board[j])
            }
            verticalWinner.push(vertical)
        }

        const winningSymbol = checkWinningCondition(board, sqrtOfBoard)

        if (winningSymbol) {
            onWinner(winningSymbol)
        }
    }

    const checkHorizontalWinner = () => {
        const horizontalWinner: string[][] = []

        for (let i = 0; i < sqrtOfBoard; i++) {
            const horizontal = []
            for (
                let j = i * sqrtOfBoard;
                j < sqrtOfBoard + i * sqrtOfBoard;
                j++
            ) {
                horizontal.push(board[j])
            }
            horizontalWinner.push(horizontal)
        }

        const winningSymbol = checkWinningCondition(board, sqrtOfBoard)

        if (winningSymbol) {
            onWinner(winningSymbol)
        }
    }

    const checkDiagonalWinner = () => {
        const diagonals = []

        const diagonal1 = []
        for (let i = 0; i < board.length; i += sqrtOfBoard + 1) {
            diagonal1.push(board[i])
        }

        const diagonal2 = []
        for (
            let i = sqrtOfBoard - 1;
            i < board.length - 1;
            i += sqrtOfBoard - 1
        ) {
            diagonal2.push(board[i])
        }

        diagonals.push(diagonal1, diagonal2)

        checkDiagonal(diagonal1, sqrtOfBoard, onWinner)
        checkDiagonal(diagonal2, sqrtOfBoard, onWinner)

        checkAdditionalDiagonals(sqrtOfBoard, board, onWinner)
    }

    return {
        checkVerticalWinner,
        checkHorizontalWinner,
        checkDiagonalWinner,
    }
}

export default useWinningConditions
