import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/auth/logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { LogOut } from "../../redux/slices/auth/autSlice";


export const NavBar = () => {
    const { userModulos } = useAppSelector(
        (state) => state.auth
    );
    interface MenuItem {
        label: string;
        icon?: string;
        items?: MenuItem[];
        separator?: boolean;
        command?: () => void;
        path?: string;
    }
    const menu: MenuItem[] = userModulos;
    const dataMenu = menu;
    const navigate = useNavigate()
    const menuLeft = useRef<Menu>(null);
    // const theme = useAppSelector((state) => state.ui.theme)
    const handleMenuItemClick = (path: string) => {
        navigate(path, { replace: true });
    };
    const addCommandToMenuItems = (menuItems: MenuItem[], pathLabel: string = ''): MenuItem[] => {
        return menuItems.map((item) => {
            const newItem = { ...item };
            const currentLabel = newItem.path || pathLabel;
            if (newItem.items) {
                newItem.items = addCommandToMenuItems(newItem.items, currentLabel);
            }
            if (!newItem.items) {
                newItem.command = () => handleMenuItemClick(currentLabel);
            }
            return newItem;
        });
    };
    const dispatch = useAppDispatch();
    // const handleThemeToggle = () => {
    //     dispatch(toggleTheme());
    // };
    const menuWithCommands: MenuItem[] = addCommandToMenuItems(dataMenu);
    const handleLogOut = () => {
        dispatch(LogOut());
    };

    const items: MenuItem[] = [
        {
            label: 'Sesion',
            items: [
                {
                    label: 'Cerrar',
                    icon: 'pi pi-power-off',
                    command: () => handleLogOut()

                },

            ]
        },

    ];
    const start = <img alt="logo" src={logo} height="40" width={"80"} className="mt-1 ml-2 mr-2"></img>;
    const end = <>
        {/* <ToggleButton
            onLabel=""
            offLabel=""
            onIcon="pi pi-sun"
            offIcon="pi pi-moon"
            className="w-9rem"
            checked={theme} // Indica si el toggle está activado o desactivado basado en el estado del tema
            onChange={handleThemeToggle} // Maneja el cambio de tema al hacer clic en el toggle
        /> */}
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
        <Button icon="pi pi-cog" size="small" className="mr-2" onClick={(event) => menuLeft.current?.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
    </>
    return (
        <div className="h-5rem">
            <div >
                <Menubar className='shadow-3' model={menuWithCommands} start={start} end={end} />
            </div >
        </div>
    )
}
