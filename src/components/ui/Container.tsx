import React from 'react'

interface Props {
    children: React.ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <section className="flex relative flex-col items-center gap-6 min-w-[340px] md:min-w-[460px]">
            {children}
        </section>
    )
}

export default Container
