import React, { FC, ReactNode } from 'react'
import classes from './Button.module.css';
import './Button.style.css';

interface IButtonProps  {
    children: ReactNode;
    className?: string;
    onClick: () => void;
    size?: 'large' | 'medium' | 'small';
    color?: 'succes' | 'error' | 'warning' | 'main';
    variant?: 'contained' | 'outlined'; 
    rounded?: '' | 'low-smooth' | 'medium-smooth' | 'strong-smooth';
    width?: '' | 'half' | 'full';
}

const Button:FC<IButtonProps> = ({
        children, onClick,
        className,
        size = 'medium', 
        color = 'main', 
        variant = 'contained',
        width,
        rounded
    }) => {

    const classNames = `
        btn 
        ${className}
        ${classes[variant]} 
        ${classes[color]} 
        ${classes[size]}
        ${rounded ? classes[rounded] : ''}
        ${width ? classes[width] : ''}
    `    

    return (
        <div className={classNames} onClick={onClick}>{children}</div>
    );
}

export default Button