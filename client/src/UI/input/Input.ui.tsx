import React, { ChangeEvent, FC, Fragment, KeyboardEvent } from 'react'
import classes from './Input.module.css';


interface InputProps {
    className?: string;
    type: string;
    placeholder?: string;
    value: string;
    valueSetter: (string: string) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    color?: 'main';
    size?: 'small' | 'medium' | 'large';
    width?: '' | 'full' | 'half';
    rounded?: '' | 'low-smooth' | 'medium-smooth' | 'strong-smooth';
}

const Input:FC<InputProps> = ({
    className,
    type, 
    placeholder, 
    value,
    valueSetter, 
    onChange, 
    onKeyDown, 
    color = 'main',
    size = 'medium',
    width = '',
    rounded = ''
}) => {

    const classNames = `${classes.input} ${className} ${classes[color]} ${classes[size]} ${classes[width]} ${classes[rounded]}`

    const clearInput = () => {
        valueSetter('');
    }

    return (
        <div className={classes.inputContainer}>
            <input 
                className={classNames}
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <span className={classes.inputClearBtn} onClick={clearInput}>&times;</span>
        </div>
    )
}

export default Input