import { useCallback, useState } from 'react'
import './App.css'
import NewGameMenu from './screens/NewGameMenu'
import GameStart from './screens/GameStart'
import useLocalStorage from './hooks/useLocalStorage'
import useIsMobile from './hooks/useIsMobile'
import { playerCPUType } from './types'

const generateBoard = (generateNumber: number) =>
    Array(generateNumber).fill(null)

function App() {
    const isMobile = useIsMobile()
    const [pickedXO, setPickedXO] = useState('x')

    const [CPU, setCPU] = useLocalStorage('CPU', {
        isPicked: false,
        isWinner: false,
        numberOfWins: 0,
        XO: '',
    })
    const [player, setPlayer] = useLocalStorage('Player', {
        isPicked: false,
        isWinner: false,
        numberOfWins: 0,
        XO: '',
    })
    const [secondPlayer, setSecondPlayer] = useLocalStorage('SecondPlayer', {
        isPicked: false,
        isWinner: false,
        numberOfWins: 0,
        XO: '',
    })
    const [tie, setTie] = useState({ isTie: false, numberOfTies: 0 })

    const getRandomNumberOfBoard = () => {
        const arrayOfBoard = [9, 16, 25, 36, 49, 64, 81, 100]
        const arrayOfBoardForMobile = [9, 16, 25, 36, 49]

        if (isMobile) {
            return arrayOfBoardForMobile[
                Math.floor(Math.random() * arrayOfBoardForMobile.length)
            ]
        }

        return arrayOfBoard[Math.floor(Math.random() * arrayOfBoard.length)]
    }
    const [board, setBoard] = useLocalStorage(
        'board',
        generateBoard(getRandomNumberOfBoard())
    )

    const handlePickXO = (xorO: string) => {
        setPickedXO(xorO)
    }

    const handlePickCPU = useCallback(() => {
        setCPU((prevState) => ({
            ...prevState,
            isPicked: true,
            XO: pickedXO === 'x' ? 'o' : 'x',
        }))

        setPlayer((prevState) => ({
            ...prevState,
            isPicked: true,
            XO: pickedXO === 'x' ? 'x' : 'o',
        }))
    }, [pickedXO])

    const handlePickPlayer = useCallback(() => {
        setPlayer((prevState) => ({
            ...prevState,
            isPicked: true,
            XO: pickedXO === 'x' ? 'x' : 'o',
        }))

        setSecondPlayer((prevState) => ({
            ...prevState,
            isPicked: true,
            XO: pickedXO === 'x' ? 'o' : 'x',
        }))
    }, [pickedXO])

    const handleResetGame = useCallback(() => {
        setCPU((prevState) => ({
            ...prevState,
            isPicked: false,
            isWinner: false,
            numberOfWins: 0,
            XO: '',
        }))
        setPlayer((prevState) => ({
            ...prevState,
            isPicked: false,
            isWinner: false,
            numberOfWins: 0,
            XO: '',
        }))
        setSecondPlayer((prevState) => ({
            ...prevState,
            isPicked: false,
            isWinner: false,
            numberOfWins: 0,
            XO: '',
        }))
        setTie({ isTie: false, numberOfTies: 0 })
        setBoard(generateBoard(getRandomNumberOfBoard()))
    }, [setBoard, getRandomNumberOfBoard])

    const handleWinner = useCallback(
        (winner: string) => {
            const handleCondition = (player: playerCPUType) => {
                return (
                    (winner === 'x' && player.XO === 'x' && !player.isWinner) ||
                    (winner === 'o' && player.XO === 'o' && !player.isWinner)
                )
            }

            if (handleCondition(player)) {
                setPlayer((prevState) => ({
                    ...prevState,
                    isWinner: true,
                    numberOfWins: prevState.numberOfWins + 1,
                }))
            }
            if (handleCondition(secondPlayer)) {
                setSecondPlayer((prevState) => ({
                    ...prevState,
                    isWinner: true,
                    numberOfWins: prevState.numberOfWins + 1,
                }))
            }
            if (handleCondition(CPU)) {
                setCPU((prevState) => ({
                    ...prevState,
                    isWinner: true,
                    numberOfWins: prevState.numberOfWins + 1,
                }))
            }
        },
        [player, secondPlayer, CPU]
    )

    const handleNextRound = () => {
        setBoard(generateBoard(getRandomNumberOfBoard()))

        setPlayer((prevState) => ({ ...prevState, isWinner: false }))
        setSecondPlayer((prevState) => ({ ...prevState, isWinner: false }))
        setCPU((prevState) => ({ ...prevState, isWinner: false }))
        setTie((prevState) => ({ ...prevState, isTie: false }))
    }

    return (
        <main className="min-h-screen px-3 md:px-0 py-8 w-full flex items-center justify-center bg-backgroundPrimary">
            {!CPU.isPicked && !player.isPicked ? (
                <NewGameMenu
                    onPickXO={handlePickXO}
                    pickedXO={pickedXO}
                    onPickCPU={handlePickCPU}
                    onPickPlayer={handlePickPlayer}
                />
            ) : (
                <GameStart
                    onSetTies={setTie}
                    onWinner={handleWinner}
                    onNextRound={handleNextRound}
                    setBoard={setBoard}
                    board={board}
                    onReset={handleResetGame}
                    player={player}
                    secondPlayer={secondPlayer}
                    ties={tie}
                    cpu={CPU}
                />
            )}
        </main>
    )
}

export default App
