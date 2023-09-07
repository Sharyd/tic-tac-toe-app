import { playerCPUType } from '../types'

const useWinningConditions = (
    board: string[],
    sqrtOfBoard: number,
    onWinner: (winner: string) => void
) => {
    const checkWinningCondition = (board: string[], sqrtOfBoard: number) => {
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

        const diagonalWinner = ['x', 'o'].find((checkSymbol) => {
            let consecutiveCount = 0
            for (let i = 0; i < sqrtOfBoard; i++) {
                const index = i * sqrtOfBoard + i
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
            return false
        })

        return horizontalWinner || verticalWinner || diagonalWinner
    }

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

        const checkDiagonal = (diagonal: string[]) => {
            let consecutive
            for (const symbol of ['x', 'o']) {
                if (sqrtOfBoard >= 5) {
                    consecutive = diagonal.join('').includes(symbol.repeat(5))
                } else {
                    consecutive = diagonal.every((item) => item === symbol)
                }
                if (consecutive) {
                    onWinner(symbol)
                    return
                }
            }
        }

        checkDiagonal(diagonal1)
        checkDiagonal(diagonal2)

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

                checkDiagonal(additionalDiagonal1)
                checkDiagonal(additionalDiagonal2)
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
                checkDiagonal(additionalDiagonal1)
                checkDiagonal(additionalDiagonal2)
            }
        }
    }

    const isWinningMove = (
        board: string[],
        moveIndex: number,
        symbol: string
    ): boolean => {
        const rows = Math.sqrt(board.length)
        const rowIndex = Math.floor(moveIndex / rows)
        const colIndex = moveIndex % rows

        let horizontalCount = 0
        for (let col = 0; col < rows; col++) {
            const index = rowIndex * rows + col
            if (board[index] === symbol) {
                horizontalCount++
                if (horizontalCount >= 5) {
                    return true
                }
            } else {
                horizontalCount = 0
            }
        }

        let verticalCount = 0
        for (let row = 0; row < rows; row++) {
            const index = row * rows + colIndex
            if (board[index] === symbol) {
                verticalCount++
                if (verticalCount >= 5) {
                    return true
                }
            } else {
                verticalCount = 0
            }
        }

        let diagonalCount1 = 0
        for (let i = -4; i <= 4; i++) {
            const row = rowIndex + i
            const col = colIndex + i
            if (row >= 0 && row < rows && col >= 0 && col < rows) {
                const index = row * rows + col
                if (board[index] === symbol) {
                    diagonalCount1++
                    if (diagonalCount1 >= 5) {
                        return true // Diagonal win
                    }
                } else {
                    diagonalCount1 = 0
                }
            }
        }

        let diagonalCount2 = 0
        for (let i = -4; i <= 4; i++) {
            const row = rowIndex + i
            const col = colIndex - i
            if (row >= 0 && row < rows && col >= 0 && col < rows) {
                const index = row * rows + col
                if (board[index] === symbol) {
                    diagonalCount2++
                    if (diagonalCount2 >= 5) {
                        return true
                    }
                } else {
                    diagonalCount2 = 0
                }
            }
        }

        return false
    }

    const findWinningMoveForCPU = (cpu: playerCPUType): number | null => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                const testBoard = [...board]
                testBoard[i] = cpu.XO

                if (isWinningMove(testBoard, i, cpu.XO)) {
                    return i
                }
            }
        }

        return null
    }

    return {
        checkVerticalWinner,
        checkHorizontalWinner,
        checkDiagonalWinner,
        findWinningMoveForCPU,
    }
}

export default useWinningConditions
