import Card from '../ui/Card'
import { playerCPUType } from '../../types'

interface Props {
    player: playerCPUType
    secondPlayer: playerCPUType
    cpu: playerCPUType
    ties: number
}

const WinsView = ({ player, secondPlayer, cpu, ties }: Props) => {
    const setPlayerInfo = (symbol: string) => {
        let playerInfo = ''

        if (player.XO === symbol) playerInfo = symbol.toUpperCase() + ' (YOU)'
        else if (secondPlayer.XO === symbol)
            playerInfo = symbol.toUpperCase() + ' (P2)'
        else if (cpu.XO === symbol) playerInfo = symbol.toUpperCase() + ' (CPU)'

        return playerInfo
    }

    const setPlayerWins = (symbol: string) => {
        if (player.XO === symbol) return player.numberOfWins
        else if (secondPlayer.XO === symbol) return secondPlayer.numberOfWins
        else if (cpu.XO === symbol) return cpu.numberOfWins

        return 0
    }
    return (
        <div className="flex w-full gap-4 items-center justify-center text-backgroundPrimary">
            <Card variant={'tertiary'} colors={'primary'}>
                <div className="flex flex-col gap-0 items-center">
                    <p className="text-xsmall">{setPlayerInfo('x')}</p>
                    <p className="font-bold text-large">{setPlayerWins('x')}</p>
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
                    <p className="text-xsmall">{setPlayerInfo('o')}</p>
                    <p className="font-bold text-large">{setPlayerWins('o')}</p>
                </div>
            </Card>
        </div>
    )
}

export default WinsView
