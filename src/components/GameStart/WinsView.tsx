import React from 'react'
import Card from '../ui/Card'

interface Props {
    player: {
        isPicked: boolean
        numberOfWins: number
        XO: string
    }
    secondPlayer: {
        isPicked: boolean
        numberOfWins: number
        XO: string
    }
    cpu: {
        isPicked: boolean
        numberOfWins: number
        XO: string
    }
    ties: number
}

const WinsView = ({ player, secondPlayer, cpu, ties }: Props) => {
    return (
        <div className="flex w-full gap-4 items-center justify-center text-backgroundPrimary">
            <Card variant={'tertiary'} colors={'primary'}>
                <div className="flex flex-col gap-0 items-center">
                    <p className="text-xsmall">
                        {player.XO === 'x' && 'X (YOU)'}
                        {secondPlayer.XO === 'x' && 'X (P2)'}
                        {cpu.XO === 'x' && 'X (CPU)'}
                    </p>
                    <p className="font-bold text-large">
                        {player.numberOfWins}
                    </p>
                </div>
            </Card>
            <Card variant={'tertiary'} colors={'tertiary'}>
                <div className="flex flex-col gap-0 items-center">
                    <p className="text-xsmall">TIES</p>
                    <p className="font-bold text-large">{ties}</p>
                </div>
            </Card>
            <Card variant={'tertiary'} colors={'secondary'}>
                <div className="flex flex-col gap-0 items-center">
                    <p className="text-xsmall">
                        {player.XO === 'o' && 'O (YOU)'}
                        {secondPlayer.XO === 'o' && 'O (P2)'}
                        {cpu.XO === 'o' && 'O (CPU)'}
                    </p>
                    <p className="font-bold text-large">
                        {secondPlayer.isPicked
                            ? secondPlayer.numberOfWins
                            : cpu.isPicked
                            ? cpu.numberOfWins
                            : ''}
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default WinsView
