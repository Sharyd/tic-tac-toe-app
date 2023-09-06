import React from 'react'
import { useState } from 'react'

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    React.useEffect(() => {
        if (typeof window === 'undefined') return
        const fn = () =>
            setIsMobile(
                !window.matchMedia('(min-width: 768px)').matches ||
                    !window.matchMedia('(min-height: 450px)').matches
            )
        window.addEventListener('resize', fn)
        fn()
        return () => window.removeEventListener('resize', fn)
    }, [])

    return isMobile
}

export default useIsMobile
