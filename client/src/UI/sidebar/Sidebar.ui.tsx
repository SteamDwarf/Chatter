import React, { ReactNode, FC } from 'react'
import Container from '../container/Container';

interface ISidebarProps {
    children: ReactNode;
    header?: ReactNode;
    width?: string;
}

const Sidebar:FC<ISidebarProps> = ({children, header, width}) => {
    return (
        <Container typeDirection='column' contentPosition='left-top'>
            {header}
            {children}
        </Container>
    )
}

export default Sidebar;