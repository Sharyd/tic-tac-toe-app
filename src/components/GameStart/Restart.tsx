import Modal from '../ui/Modal'

interface Props {
    onReset: () => void
    onClose: () => void
}

const Restart = ({ onReset, onClose }: Props) => {
    return (
        <Modal
            onClose={onClose}
            onNext={onReset}
            closeText={'No, Cancel'}
            nextText={'Yes, Restart'}
        >
            <h2 className="h1">Restart game?</h2>
        </Modal>
    )
}

export default Restart
