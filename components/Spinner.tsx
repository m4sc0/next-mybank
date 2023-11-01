import React from 'react'

interface SpinnerProps {
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
    className
}) => {
    return (
        <div className={`w-full flex justify-center items-center ${className}`}>
            <span className="loader"></span>
        </div>
    )
}

export default Spinner