import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'
import IconXO from '../ui/IconXO'
import {
    calculateGridCols,
    calculatePadding,
    calculateWidthAndHeight,
} from '../../utils/calculate'

interface Props {
    sqrtOfBoard: number
    onClickSquare: (index: number) => void
    board: string[]
}

const Board = ({ sqrtOfBoard, onClickSquare, board }: Props) => {
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
                        onClick={() => onClickSquare(index)}
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
                        </span>
                    </div>
                )
            })}
        </motion.div>
    )
}

export default Board
