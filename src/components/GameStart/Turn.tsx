import React from 'react'
import Card from '../ui/Card'
import IconXO from '../ui/IconXO'

interface Props {
    turn: string
}

const Turn = ({ turn }: Props) => {
    return (
        <Card variant={'secondary'}>
            <div className="flex gap-3 items-center">
                <IconXO
                    type={turn === 'x' ? 'x' : turn === 'o' ? 'o' : 'x'}
                    width="20"
                    height="20"
                    className=" fill-tertiary"
                />

                <h2 className="h2">Turn</h2>
            </div>
        </Card>
    )
}

export default Turn
