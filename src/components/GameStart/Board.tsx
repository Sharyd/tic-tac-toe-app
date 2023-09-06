import { useState } from 'react'
import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'
import IconXO from '../ui/IconXO'
import {
    calculateGridCols,
    calculatePadding,
    calculateWidthAndHeight,
} from '../../utils/calculate'
import IconXOOutline from '../ui/IconXOoutline'

interface Props {
    sqrtOfBoard: number
    onClickSquare: (index: number) => void
    board: string[]
    isTurnCPU: boolean
    turn: 'x' | 'o' | undefined
}

const Board = ({
    sqrtOfBoard,
    onClickSquare,
    board,
    turn,
    isTurnCPU,
}: Props) => {
    const [isHover, setIsHover] = useState<null | number>(null)

    const isFreeBox = (index: number) => {
        return board[index] === null
    }

    return (
        <motion.div
            className={cn('grid gap-4', {
                [calculateGridCols(sqrtOfBoard)]: true,
            })}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            {board.map((square, index) => {
                return (
                    <div
                        onClick={() => !isTurnCPU && onClickSquare(index)}
                        onMouseEnter={() => {
                            setIsHover(index)
                        }}
                        onMouseLeave={() => {
                            setIsHover(null)
                        }}
                        key={index}
                        className={cn(
                            'bg-backgroundSecondary cursor-pointer rounded-xl relative shadow-customInnerBottomDarkSmall',
                            {
                                [calculatePadding(sqrtOfBoard)]: true,
                            }
                        )}
                    >
                        <span className="absolute text-4xl -translate-x-1/2 -translate-y-1/2">
                            <IconXO
                                outline={false}
                                type={
                                    square === 'x'
                                        ? 'x'
                                        : square === 'o'
                                        ? 'o'
                                        : undefined
                                }
                                width={calculateWidthAndHeight(sqrtOfBoard)}
                                height={calculateWidthAndHeight(sqrtOfBoard)}
                                className={cn({
                                    'fill-primary': square === 'x',
                                    'fill-secondary': square === 'o',
                                })}
                            />
                            {isHover === index && isFreeBox(index) && (
                                <IconXOOutline
                                    outline
                                    type={!isTurnCPU ? turn : undefined}
                                    width={calculateWidthAndHeight(sqrtOfBoard)}
                                    height={calculateWidthAndHeight(
                                        sqrtOfBoard
                                    )}
                                />
                            )}
                        </span>
                    </div>
                )
            })}
        </motion.div>
    )
}

export default Board
