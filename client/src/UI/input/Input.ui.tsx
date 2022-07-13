import React, { ChangeEvent, FC, KeyboardEvent } from 'react'
import './Input.style.css';
import classes from './Input.module.css';


interface InputProps {
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    color?: 'main';
    size?: 'small' | 'medium' | 'large';
    width?: '' | 'full' | 'half';
    rounded?: '' | 'low-smooth' | 'medium-smooth' | 'strong-smooth';
}

const Input:FC<InputProps> = ({
    type, 
    placeholder, 
    value, 
    onChange, 
    onKeyDown, 
    color = 'main',
    size = 'medium',
    width = '',
    rounded = ''
}) => {

    const className = `input ${classes[color]} ${classes[size]} ${classes[width]} ${classes[rounded]}`

    return (
        <input 
            className={className}
            type={type} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}

export default Input