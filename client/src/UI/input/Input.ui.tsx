import React, { ChangeEvent, FC, InputHTMLAttributes, KeyboardEvent, memo } from 'react'
import './Input.css';

interface InputProps {
    className?: string;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    valueSetter: (string: string) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    size?: 'small' | 'medium' | 'large';
    width?: '' | 'full' | 'half';
    rounded?: '' | 'low-smooth' | 'medium-smooth' | 'strong-smooth';
}

const Input:FC<InputProps> = memo(({
    className,
    type = 'text', 
    placeholder, 
    value,
    valueSetter, 
    onChange, 
    onKeyDown, 
    size = 'medium',
    width = '',
    rounded = ''
}) => {

    const classNames = `input ${className} ${size} ${width} ${rounded}`

    const clearInput = () => {
        valueSetter('');
    }

    return (
        <div className='input__wrapper'>
            <input 
                className={classNames}
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <span className='input__clear-btn' onClick={clearInput}>&times;</span>
        </div>
    )
});

export default Input;