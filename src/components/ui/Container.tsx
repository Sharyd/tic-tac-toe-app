import React from 'react'

interface Props {
    children: React.ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <section className="flex flex-col items-center gap-6 min-w-[460px]">
            {children}
        </section>
    )
}

export default Container
