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

        return horizontalWinner || verticalWinner
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
        for (const symbol of ['x', 'o']) {
            for (let i = 0; i <= sqrtOfBoard - 5; i++) {
                let consecutiveCount = 0
                for (let j = i; j < board.length; j += sqrtOfBoard + 1) {
                    if (board[j] === symbol) {
                        consecutiveCount++
                        if (
                            (consecutiveCount >= 5 && sqrtOfBoard >= 5) ||
                            consecutiveCount === sqrtOfBoard
                        ) {
                            onWinner(symbol)
                            return
                        }
                    } else {
                        consecutiveCount = 0
                    }
                }
            }

            for (
                let i = sqrtOfBoard - 1;
                i <= board.length - sqrtOfBoard;
                i += sqrtOfBoard - 1
            ) {
                let consecutiveCount = 0
                for (let j = i; j < board.length; j += sqrtOfBoard - 1) {
                    if (board[j] === symbol) {
                        consecutiveCount++
                        if (
                            (consecutiveCount >= 5 && sqrtOfBoard >= 5) ||
                            consecutiveCount === sqrtOfBoard
                        ) {
                            onWinner(symbol)
                            return
                        }
                    } else {
                        consecutiveCount = 0
                    }
                }
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
