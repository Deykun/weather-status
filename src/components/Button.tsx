import React from 'react';
import clsx from 'clsx';

import './Button.scss'

interface ButtonProps {
    className?: string,
    children: React.ReactNode,
}

const Button = ({ className, children }: ButtonProps) => {
    return (
        <button className={clsx('button', { [className || '']: className })}>
            {children}
        </button>
    )
  }
  
  export default Button;
  