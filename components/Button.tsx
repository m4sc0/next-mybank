import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return (
        <button
            type={type}
            className={twMerge(`
                rounded-md
                px-3
                py-2
                bg-neutral-900
                text-white
                dark:bg-neutral-100
                dark:text-black
                whitespace-nowrap
                transition
            `,
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
});

Button.displayName = "Button";

export default Button;