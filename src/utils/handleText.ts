import { playerCPUType } from '../types'

export const handleTextPlayer = (
    player: playerCPUType,
    secondPlayer: playerCPUType,
    isTie: boolean
) => {
    if (player.isPicked && secondPlayer.isPicked && !isTie) {
        if (player.isWinner) {
            return 'Player 1 wins!'
        }
        if (secondPlayer.isWinner) {
            return 'Oh no, you lost...'
        }
    }
}

export const handleTextCPU = (
    player: playerCPUType,
    cpu: playerCPUType,
    isTie: boolean
) => {
    if (player.isPicked && cpu.isPicked && !isTie) {
        if (player.isWinner) {
            return 'You won!'
        }
        if (cpu.isWinner) {
            return 'Oh no, you lost...'
        }
    }
}
