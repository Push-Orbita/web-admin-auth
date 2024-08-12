import { ChildContainerProps, MenuContextProps } from '@layout/types/types';
import { useState, createContext } from 'react';


export const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider: React.FC<ChildContainerProps> = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
