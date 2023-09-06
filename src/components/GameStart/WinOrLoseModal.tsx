import Modal from '../ui/Modal'
import IconXO from '../ui/IconXO'
import { playerCPUType } from '../../types'
import { cn } from '../../utils/cn'
import { handleTextCPU, handleTextPlayer } from '../../utils/handleText'
import useIsMobile from '../../hooks/useIsMobile'

interface Props {
    onQuit: () => void
    onNextRound: () => void
    player: playerCPUType
    secondPlayer: playerCPUType
    cpu: playerCPUType
    isTie: boolean
}
const WinOrLoseModal = ({
    onQuit,
    onNextRound,
    player,
    secondPlayer,
    cpu,
    isTie,
}: Props) => {
    const isMobile = useIsMobile()
    const getXO = () => {
        const findWinner = [player, secondPlayer, cpu].find(
            (player) => player.isWinner
        )
        if (findWinner) {
            return findWinner.XO
        }
    }
    return (
        <Modal
            closeText="Quit"
            nextText="Next round"
            onClose={onQuit}
            onNext={onNextRound}
        >
            <div className="flex flex-col items-center gap-4">
                <h2 className="h2">
                    {handleTextPlayer(player, secondPlayer, isTie)}
                    {handleTextCPU(player, cpu, isTie)}
                </h2>
                <div className="flex items-center justify-center gap-3 md:gap-6">
                    {!isTie && (
                        <>
                            <IconXO
                                className={cn('fill-secondary', {
                                    'fill-primary': getXO() === 'x',
                                })}
                                type={getXO() as 'x' | 'o'}
                                width={isMobile ? '46' : '64'}
                                height={isMobile ? '46' : '64'}
                            />
                        </>
                    )}
                    <h2
                        className={cn('h1 ', {
                            'text-primary': getXO() === 'x',
                            'text-secondary': getXO() === 'o',
                        })}
                    >
                        {isTie ? 'round tied' : 'Takes the round'}
                    </h2>
                </div>
            </div>
        </Modal>
    )
}

export default WinOrLoseModal
