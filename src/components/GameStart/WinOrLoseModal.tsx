import React from 'react'
import { Button } from '../ui/Button'

interface Props {
    onQuit: () => void
    onNextRound: () => void
}
const WinOrLoseModal = ({ onQuit, onNextRound }: Props) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-backgroundPrimary rounded-xl w-full h-1/3 flex flex-col items-center justify-center">
                <h2 className="h2"></h2>
                <div className="flex gap-4">
                    <Button onClick={onQuit} size={'sm'} variant={'tertiary'}>
                        quit
                    </Button>
                    <Button
                        onClick={onNextRound}
                        size={'sm'}
                        variant={'secondary'}
                    >
                        next round
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WinOrLoseModal
