import React, { forwardRef } from 'react'
import Button from './Button'
import { twMerge } from 'tailwind-merge';

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { };

const LoginButton = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return (
        <Button
            type='button'
            className={twMerge(`
                
            `, className)}
            {...props}
        >
            {children}
        </Button>
    )
});

LoginButton.displayName = 'LoginButton';
export default LoginButton;