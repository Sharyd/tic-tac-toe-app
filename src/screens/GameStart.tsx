import React, { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import XO from '../components/ui/XO'
import Turn from '../components/GameStart/Turn'
import { Button } from '../components/ui/Button'
import Board from '../components/GameStart/Board'
import WinsView from '../components/GameStart/WinsView'

import WinOrLoseModal from '../components/GameStart/WinOrLoseModal'

interface Props {
    setBoard: React.Dispatch<React.SetStateAction<string[]>>
    onReset: () => void
    board: string[]
    secondPlayer: {
        isPicked: boolean
        numberOfWins: number
        isWinner: boolean
        XO: string
    }
    player: {
        isPicked: boolean
        numberOfWins: number
        isWinner: boolean
        XO: string
    }
    cpu: {
        isPicked: boolean
        numberOfWins: number
        isWinner: boolean
        XO: string
    }

    ties: number
    onWinner: (winner: string) => void
    onNextRound: () => void
    onSetTies: React.Dispatch<
        React.SetStateAction<{
            isTie: boolean
            numberOfTies: number
        }>
    >
}

const GameStart = ({
    setBoard,
    board,
    onReset,
    player,
    cpu,
    secondPlayer,
    onWinner,
    onNextRound,
    ties,
    onSetTies,
}: Props) => {
    const [turn, setTurn] = useState('x')

    const sqrtOfBoard = Math.sqrt(board.length)

    const isWinner = player.isWinner || secondPlayer.isWinner || cpu.isWinner

    const handleGameWithPlayer = (index: number) => {
        if (!player.isPicked) return

        if (board[index] === null) {
            setBoard((prevState) => {
                const newState = [...prevState]
                newState[index] = turn
                return newState
            })
            setTurn((prevState) => (prevState === 'x' ? 'o' : 'x'))
        }
    }

    const handleGameWithCPU = (index: number) => {
        if (!cpu.isPicked) return

        if (board[index] === null) {
            setBoard((prevState) => {
                const newState = [...prevState]
                newState[index] = turn
                return newState
            })
            setTurn((prevState) => (prevState === 'x' ? 'o' : 'x'))
        }

        if (turn === 'o' && cpu.XO === 'o') {
            const randomIndex = Math.floor(Math.random() * board.length)
            if (board[randomIndex] === null) {
                setBoard((prevState) => {
                    const newState = [...prevState]
                    newState[randomIndex] = turn
                    return newState
                })
                setTurn((prevState) => (prevState === 'x' ? 'o' : 'x'))
            }
        }

        if (turn === 'x' && cpu.XO === 'x') {
            const randomIndex = Math.floor(Math.random() * board.length)
            if (board[randomIndex] === null) {
                setBoard((prevState) => {
                    const newState = [...prevState]
                    newState[randomIndex] = turn
                    return newState
                })
                setTurn((prevState) => (prevState === 'x' ? 'o' : 'x'))
            }
        }
    }

    const handleVerticalWinner = () => {
        const verticalWinner: string[][] = []

        for (let i = 0; i < sqrtOfBoard; i++) {
            const vertical = []
            for (let j = i; j < board.length; j += sqrtOfBoard) {
                vertical.push(board[j])
            }
            verticalWinner.push(vertical)
        }

        const winningSymbol = ['x', 'o'].find((symbol) => {
            return verticalWinner.some((column) => {
                if (sqrtOfBoard >= 5) {
                    return column.join('').includes(symbol.repeat(5))
                } else {
                    return column.every((item) => item === symbol)
                }
            })
        })

        if (winningSymbol) {
            onWinner(winningSymbol)
        }
    }

    const handleHorizontalWinner = () => {
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

        const winningSymbol = ['x', 'o'].find((symbol) => {
            return horizontalWinner.some((column) => {
                if (sqrtOfBoard >= 5) {
                    return column.join('').includes(symbol.repeat(5))
                } else {
                    return column.every((item) => item === symbol)
                }
            })
        })

        if (winningSymbol) {
            onWinner(winningSymbol)
        }
    }

    const handleDiagonalWinner = () => {
        const diagonals = []

        // Main diagonal (top-left to bottom-right)
        const diagonal1 = []
        for (let i = 0; i < board.length; i += sqrtOfBoard + 1) {
            diagonal1.push(board[i])
        }

        // Secondary diagonal (top-right to bottom-left)
        const diagonal2 = []
        for (
            let i = sqrtOfBoard - 1;
            i < board.length - 1;
            i += sqrtOfBoard - 1
        ) {
            diagonal2.push(board[i])
        }

        diagonals.push(diagonal1, diagonal2)

        // Function to check for a winning streak in a diagonal
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
                    return // Exit the loop once a winner is found
                }
            }
        }

        // Check the main diagonal and secondary diagonal for a winning streak
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

    const handleTies = () => {
        if (board.every((item) => item !== null)) {
            onSetTies((prevState) => ({
                ...prevState,
                isTie: true,
                numberOfTies: prevState.numberOfTies + 1,
            }))
        }
    }

    useEffect(() => {
        handleVerticalWinner()
        handleHorizontalWinner()
        handleDiagonalWinner()
        handleTies()
    }, [board])

    return (
        <Container>
            <div className="flex justify-between w-full">
                <XO />
                <Turn turn={turn} />
                <Button onClick={onReset} variant={'tertiary'} size={'sm'}>
                    <img src="/src/assets/icon-restart.svg" alt="" />
                </Button>
            </div>
            <Board
                board={board}
                sqrtOfBoard={sqrtOfBoard}
                onClickSquare={handleGameWithPlayer}
            />
            <WinsView
                ties={ties}
                player={player}
                secondPlayer={secondPlayer}
                cpu={cpu}
            />

            {isWinner && (
                <WinOrLoseModal onQuit={onReset} onNextRound={onNextRound} />
            )}
        </Container>
    )
}

export default GameStart
