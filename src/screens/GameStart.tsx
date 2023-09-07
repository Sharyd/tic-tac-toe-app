import React, { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import XO from '../components/ui/XO'
import Turn from '../components/GameStart/Turn'
import { Button } from '../components/ui/Button'
import Board from '../components/GameStart/Board'
import WinsView from '../components/GameStart/WinsView'
import WinOrLoseModal from '../components/GameStart/WinOrLoseModal'
import { playerCPUType } from '../types'
import Restart from '../components/GameStart/Restart'
import useWinningConditions from '../hooks/useWinningConditions'
import Spinner from '../components/ui/Spinner'
import RestartIcon from '../components/ui/RestartIcon'

interface Props {
    setBoard: React.Dispatch<React.SetStateAction<string[]>>
    onReset: () => void
    board: string[]
    secondPlayer: playerCPUType
    player: playerCPUType
    cpu: playerCPUType

    ties: {
        isTie: boolean
        numberOfTies: number
    }
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
    const [turn, setTurn] = useState<'x' | 'o'>('x')
    const [isReset, setIsReset] = useState(false)

    const sqrtOfBoard = Math.sqrt(board.length)
    const isWinner = player.isWinner || secondPlayer.isWinner || cpu.isWinner
    const {
        checkDiagonalWinner,
        checkHorizontalWinner,
        checkVerticalWinner,
        findWinningMoveForCPU,
    } = useWinningConditions(board, sqrtOfBoard, onWinner)

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

    const handleTies = () => {
        if (board.every((item) => item !== null)) {
            onSetTies((prevState) => ({
                ...prevState,
                isTie: true,
                numberOfTies: prevState.numberOfTies + 1,
            }))
        }
    }

    const handleGameTurn = (index: number) => {
        if (board[index] === null) {
            setBoard((prevState) => {
                const newState = [...prevState]
                newState[index] = turn
                return newState
            })
            setTurn((prevState) => (prevState === 'x' ? 'o' : 'x'))
        }
    }

    const handleGameWithCPU = () => {
        if (!cpu.isPicked || isWinner) return

        if (player.isPicked && player.XO === 'o' && turn === 'x') {
            const availableMoves = []

            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    availableMoves.push(i)
                }
            }

            const randomMove =
                availableMoves[
                    Math.floor(Math.random() * availableMoves.length)
                ]

            if (turn === cpu.XO) {
                handleGameTurn(randomMove)
                setTurn(player.XO)
            }
        } else {
            const winningMove = findWinningMoveForCPU(cpu)
            if (winningMove !== null) {
                handleGameTurn(winningMove)
                return
            }

            const blockingMove = findWinningMoveForCPU(player)
            if (blockingMove !== null) {
                handleGameTurn(blockingMove)
                return
            }

            const center = Math.floor(sqrtOfBoard / 2)
            if (board[center] === null) {
                handleGameTurn(center)
                return
            }

            const corners = [
                0,
                sqrtOfBoard - 1,
                sqrtOfBoard * (sqrtOfBoard - 1),
                sqrtOfBoard * sqrtOfBoard - 1,
            ]
            for (const corner of corners) {
                if (board[corner] === null) {
                    handleGameTurn(corner)
                    return
                }
            }

            const edges = [1, 3, 5, 7]
            for (const edge of edges) {
                if (board[edge] === null) {
                    handleGameTurn(edge)
                    return
                }
            }

            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    handleGameTurn(i)
                    return
                }
            }
        }
    }
    const handleBotThinkingSpinner = () => {
        if (turn === cpu.XO) {
            return <Spinner color={cpu.XO === 'x' ? '#31C3BD' : '#F2B137'} />
        }
    }

    useEffect(() => {
        checkDiagonalWinner()
        checkHorizontalWinner()
        checkVerticalWinner()
        handleTies()

        if (turn === cpu.XO) {
            const randomTimer = Math.floor(Math.random() * 1000) + 1000
            const timer = setTimeout(() => {
                !isWinner && handleGameWithCPU()
            }, randomTimer)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [board, turn, cpu.XO, isWinner, onWinner])

    return (
        <Container>
            <div className="flex justify-between w-full">
                <XO />
                <Turn turn={turn} />
                <Button
                    onClick={() => setIsReset(true)}
                    variant={'tertiary'}
                    size={'sm'}
                >
                    <RestartIcon />
                </Button>
            </div>
            <Board
                turn={turn}
                isTurnCPU={cpu.isPicked && turn === cpu.XO}
                board={board}
                sqrtOfBoard={sqrtOfBoard}
                onClickSquare={handleGameWithPlayer}
            />
            <WinsView
                ties={ties.numberOfTies}
                player={player}
                secondPlayer={secondPlayer}
                cpu={cpu}
            />

            {(isWinner || ties.isTie) && (
                <WinOrLoseModal
                    isTie={ties.isTie}
                    player={player}
                    secondPlayer={secondPlayer}
                    cpu={cpu}
                    onQuit={onReset}
                    onNextRound={onNextRound}
                />
            )}
            {isReset && (
                <Restart onReset={onReset} onClose={() => setIsReset(false)} />
            )}
            {handleBotThinkingSpinner()}
        </Container>
    )
}

export default GameStart
