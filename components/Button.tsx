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
                w-full
                rounded-md
                px-3
                py-2
                bg-neutral-900
                text-white
                dark:bg-neutral-100
                dark:text-black
                whitespace-nowrap
                transition
                hover:bg-neutral-600
                dark:hover:bg-neutral-400
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