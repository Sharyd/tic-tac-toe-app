import React from 'react'
import IconXO from './IconXO'

const XO = () => {
    return (
        <div className="flex gap-2">
            <IconXO
                type="x"
                width="32"
                height="32"
                className="w-16 h-16 fill-primary"
            />

            <IconXO
                width="32"
                height="32"
                type="o"
                className="w-16 h-16 fill-secondary"
            />
        </div>
    )
}

export default XO
