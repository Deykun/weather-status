import React from 'react';
import clsx from 'clsx';

import IconWait from './Icon/IconWait';

import './Button.scss'

interface Props {
    className?: string,
    children: React.ReactNode,
    isDisabled?: boolean,
    isLoading?: boolean,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
}

const Button = ({
    className,
    children,
    isDisabled,
    isLoading,
    onClick,
}: Props) => {
    return (
        <button
            className={clsx('button', { 
                'button--loading': isLoading,
                [className || '']: className,
            })}
            onClick={onClick}
            type="button"
            disabled={isDisabled}
        >
            {isLoading && <span className="button-loading-state">
                <IconWait />
                <span>Ładowanie...</span>
            </span>}
            {children}
        </button>
    )
  }
  
  export default Button;
  