import React, { forwardRef } from 'react'

interface HRProps {
    full?: boolean;
    className?: string;
}

const HR:React.FC<HRProps> = (({
    full,
    className,
}, ref) => {
    return (
        <hr
        className={`${full ? 'w-full' : 'w-48'} h-0.5 mx-auto my-2 bg-gray-300 border-0 rounded dark:bg-neutral-700 ${className}`}
        />
        )
});

HR.displayName = 'HR';
export default HR;