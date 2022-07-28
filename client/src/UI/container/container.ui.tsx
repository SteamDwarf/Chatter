import React, { FC, ReactNode } from 'react'
import './container.style.css';

type ContentPostion = 'center-center' | 'left-center' | 'right-center' | 'center-top' | 'center-bottom'
                        | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom';

interface IContainerProps {
    children: ReactNode;
    className?: string;
    contentPosition?: ContentPostion;
    contentRarity?: 'space-between' | 'space-around' | 'center' | '';
    typeDirection?: 'column' | 'row';
    width?: 'fullWidth' | 'halfWidth' | 'quartWidth';
    height?: 'fullHeight' | 'halfHeight' | 'quartHeight' | '';
    shadow?: '' | 'volume'
}


const Container:FC<IContainerProps> = ({
    children,
    className,
    contentPosition = 'left-top',
    contentRarity = '',
    typeDirection = "row", 
    height = '',
    width = 'fullWidth',
    shadow = ''
}) => {

    const classNames = `
        container
        ${className}  
        ${contentPosition} 
        ${typeDirection} 
        ${height}
        ${contentRarity}
        ${width}
        ${shadow}
    `

    return (
    <div className={classNames}>
        {children}
    </div>
    )
}

export default Container;