import React, { FC, ReactNode } from 'react'

import classes from './Container.module.css';
import './Container.style.css';

type ContentPostion = 'center-center' | 'left-center' | 'right-center' | 'center-top' | 'center-bottom'
                        | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom';

interface IContainerProps {
    children: ReactNode;
    contentPosition?: ContentPostion;
    contentRarity?: 'space-between' | 'space-around' | 'center' | '';
    typeDirection?: 'column' | 'row';
    width?: string;
    widthType?: 'fullWidth' | 'halfWidth' | 'quartWidth';
    heightType?: 'fullHeight' | 'halfHeight' | 'quartHeight' | '';
    shadow?: '' | 'volume'
}


const Container:FC<IContainerProps> = ({
    children, 
    contentPosition = 'left-top',
    contentRarity,
    typeDirection = "row", 
    heightType = '',
    width,
    widthType = 'fullWidth',
    shadow = ''
}) => {
    
    const className = `
        container  
        ${classes[contentPosition]} 
        ${classes[typeDirection]} 
        ${heightType ? classes[heightType] : ''}
        ${contentRarity ? classes[contentRarity] : ''}
        ${classes[widthType]}
        ${shadow ? classes[shadow] : ''}
    `

    return (
    <div className={className} style={width ? {width: `${width}%`} : {}}>
        {children}
    </div>
    )
}

export default Container;