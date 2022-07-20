import React, { FC, HTMLAttributes, ReactNode } from 'react'
import './Button.css';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    type?: 'button' | 'reset' | 'submit'; 
    onClick?: () => void;
    size?: 'large' | 'medium' | 'small';
    color?: 'succes' | 'error' | 'warning' | 'main';
    variant?: 'contained' | 'outlined'; 
    rounded?: '' | 'low-smooth' | 'medium-smooth' | 'strong-smooth';
    width?: '' | 'half' | 'full';
    disabled?: boolean; 
}

const Button:FC<IButtonProps> = ({
        children, 
        type = 'button',
        onClick,
        className,
        size = 'medium', 
        color = 'main', 
        variant = 'contained',
        width,
        rounded,
        disabled = false
    }) => {

    const classNames = `
        btn 
        ${className}
        ${variant} 
        ${color} 
        ${size}
        ${rounded ? rounded : ''}
        ${width ? width : ''}
    `    

    return (
        <button disabled={disabled} className={classNames} type={type} onClick={onClick}>{children}</button>
    );
}

export default Button