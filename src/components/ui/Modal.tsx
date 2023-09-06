import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from './Button'
import { motion } from 'framer-motion'

interface Props {
    onClose: () => void
    children: React.ReactNode
    onNext: () => void
    closeText: string
    nextText: string
}

const Modal = ({ onClose, children, onNext, closeText, nextText }: Props) => {
    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="bg-backgroundPrimary rounded-xl w-full h-[34.5%] flex flex-col items-center justify-center"
            >
                <div className="flex gap-4 flex-col">
                    {children}
                    <div className="flex gap-4 items-center justify-center">
                        <Button
                            onClick={onClose}
                            size={'sm'}
                            variant={'tertiary'}
                        >
                            {closeText}
                        </Button>
                        <Button
                            onClick={onNext}
                            size={'sm'}
                            variant={'secondary'}
                        >
                            {nextText}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>,
        document.getElementById('modal-root')!
    )
}

export default Modal
