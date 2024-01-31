import React from 'react';
import clsx from 'clsx';

import './Button.scss'

interface Props {
    className?: string,
    children: React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
}

const Button = ({ className, children, onClick }: Props) => {
    return (
        <button
            className={clsx('button', { [className || '']: className })}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    )
  }
  
  export default Button;
  