import XO from '../components/ui/XO'
import { Button } from '../components/ui/Button'
import PickPlayer from '../components/NewGameMessage/PickPlayer'
import Container from '../components/ui/Container'

interface Props {
    onPickXO: (xorO: string) => void
    onPickCPU: () => void
    onPickPlayer: () => void
    pickedXO: string
}

const NewGameMenu = ({
    onPickCPU,
    onPickPlayer,
    onPickXO,
    pickedXO,
}: Props) => {
    return (
        <Container>
            <XO />
            <PickPlayer onPickXO={onPickXO} pickedXO={pickedXO} />

            <div className="flex flex-col gap-4 w-full">
                <Button onClick={onPickCPU} variant={'secondary'}>
                    New game (vs cpu)
                </Button>
                <Button onClick={onPickPlayer}>New game (vs player)</Button>
            </div>
        </Container>
    )
}

export default NewGameMenu
