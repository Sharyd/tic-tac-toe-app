import React from 'react'
import Card from '../ui/Card'
import IconXO from '../ui/IconXO'
import { cn } from '../../utils/cn'

interface Props {
    onPickXO: (xorO: string) => void
    pickedXO: string
}

const PickPlayer = ({ onPickXO, pickedXO }: Props) => {
    return (
        <Card>
            <div className="py-6 px-4 rounded-xl items-center w-full flex flex-col gap-5">
                <h2 className="h2">Pick player 1's mark</h2>
                <div className="bg-backgroundPrimary w-full flex gap-2 justify-center p-2  rounded-lg">
                    <button
                        onClick={() => onPickXO('x')}
                        className={cn(
                            'rounded-md w-1/2 ml-auto py-3 flex items-center hover:bg-backgroundSecondary  justify-center',
                            {
                                'bg-tertiary hover:bg-tertiary/90 ':
                                    pickedXO === 'x',
                            }
                        )}
                    >
                        <IconXO
                            type="x"
                            className={cn('w-32 h-32 fill-tertiary', {
                                'fill-backgroundPrimary': pickedXO === 'x',
                            })}
                        />
                    </button>
                    <button
                        onClick={() => onPickXO('o')}
                        className={cn(
                            'rounded-md w-1/2 ml-auto py-3 flex items-center hover:bg-backgroundSecondary  justify-center',
                            {
                                'bg-tertiary hover:bg-tertiary/90 ':
                                    pickedXO === 'o',
                            }
                        )}
                    >
                        <IconXO
                            type="o"
                            className={cn('w-32 h-32 fill-tertiary', {
                                'fill-backgroundPrimary': pickedXO === 'o',
                            })}
                        />
                    </button>
                </div>
                <p className="paragraph">Remember: X goes first</p>
            </div>
        </Card>
    )
}

export default PickPlayer
