import React from 'react'
import { cn } from '../../utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva('bg-backgroundSecondary rounded-xl', {
    variants: {
        variant: {
            default: 'w-full shadow-customInnerBottomDark',
            secondary: 'w-max  px-7 py-3 shadow-customInnerBottomDarkSmall',
            tertiary: 'w-full py-2 md:px-7 md:py-3',
        },
        colors: {
            default: 'bg-backgroundSecondary',
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            tertiary: 'bg-tertiary',
        },
    },

    defaultVariants: {
        variant: 'default',
        colors: 'default',
    },
})

export interface CardProps extends VariantProps<typeof cardVariants> {
    children: React.ReactNode
    className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, children, colors }, ref) => {
        return (
            <div
                className={cn(cardVariants({ variant, className, colors }))}
                ref={ref}
            >
                {children}
            </div>
        )
    }
)

Card.displayName = 'Card'
export default Card
