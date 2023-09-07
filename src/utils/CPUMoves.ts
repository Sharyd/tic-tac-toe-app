export const isWinningMoveCPU = (
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
