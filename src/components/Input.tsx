import React, { useCallback } from 'react';

import './Input.scss'

interface Props {
    placeholder?: string,
    value: string,
    onChange: (value: string) => void, // dd
}

const Input = ({ placeholder, value, onChange }: Props) => {
    const handldeOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target) {
            return;
        }

        onChange(event.target.value);
    }, [onChange]);

    return (
        <input className="input" type="text" value={value} placeholder={placeholder} onChange={handldeOnChange} />
    )
  }
  
  export default Input;
  