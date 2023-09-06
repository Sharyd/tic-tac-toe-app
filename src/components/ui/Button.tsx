import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils/cn'

const buttonVariants = cva(
    'inline-flex items-center uppercase text-backgroundPrimary justify-center rounded-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary hover:bg-primaryLight ',
                secondary: ' bg-secondary hover:bg-secondaryLight   ',
                tertiary: 'bg-tertiary hover:bg-tertiaryLight',
            },

            // Dont work custom tailwind fontSize setup probably because of the same text- as a color setup
            size: {
                default:
                    'px-4 py-[1.12rem] text-[1.3rem] shadow-customInnerBottom',
                sm: 'p-4 text-[1rem] shadow-customInnerBottomSmall',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
