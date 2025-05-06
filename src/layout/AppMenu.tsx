import { MenuProvider } from '@context/menucontext';
import { useAppSelector } from '@hooks/reduxHook';
import { NavLink, useNavigate } from 'react-router-dom';
import AppMenuitem from './AppMenuitem';


const transformUserModulosToAppMenuItem = (userModulos: any): any[] => {
    return userModulos.map((modulo: any) => {
        const transformedItem: any = {
            label: modulo.label,
            icon: modulo.icon,
            to: modulo.path,
        };

        if (modulo.items) {
            transformedItem.items = transformUserModulosToAppMenuItem(modulo.items);
        }

        return transformedItem;
    });
};
const AppMenu = () => {
    const { userModulos } = useAppSelector((state: any) => state.auth);
    const navigate = useNavigate();

    const handleMenuItemClick = (path: string) => {
        navigate(path, { replace: true });
    };
    const addCommandToMenuItems = (menuItems: any[], pathLabel: string = ''): any[] => {
        return menuItems.map((item) => {
            const newItem = { ...item };
            const currentLabel = newItem.to || pathLabel;
            if (newItem.items) {
                newItem.items = addCommandToMenuItems(newItem.items, currentLabel);
            }
            if (!newItem.items) {
                newItem.command = () => handleMenuItemClick(currentLabel);
            }
            return newItem;
        });
    };
    const menu: any[] = transformUserModulosToAppMenuItem(userModulos);
    const dataMenu = addCommandToMenuItems(menu);
    return (
        <MenuProvider>
            <ul className="layout-menu">
                {dataMenu.map((item, i) => (
                    !item.separator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator" key={i}></li>
                    )
                ))}

                <NavLink to="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    {/* <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} /> */}
                </NavLink>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
