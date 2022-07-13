import React, { FC, ReactNode } from 'react'
import Container from '../../container/Container';

interface ILayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
}

const SidebarLayout:FC<ILayoutProps> = ({children, sidebar}) => {
    return (
        <Container contentPosition='left-top'>
            {sidebar}
            {children}
        </Container>
    )
}

export default SidebarLayout;