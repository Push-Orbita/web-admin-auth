
import { Button } from 'primereact/button';
import { useMenuToggle } from '@hooks/useMenuToggle';
import { LogOut } from '@redux/slices/auth/autSlice';
import { useAppDispatch } from '@hooks/reduxHook';
import { SplitButton } from 'primereact/splitbutton';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
export const AppTopbar = () => {
    const { handleToggleMenu } = useMenuToggle();
    const userName = useSelector((state: RootState) => state.auth.userNombre);
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        dispatch(LogOut());
    };
    const items = [
        {
            label: 'Cerrar Sesion',
            icon: 'pi pi-power-off',
            command: () => handleLogOut()

        }
    ]
    return (
        <div className="layout-topbar">
            <Button type="button" rounded text onClick={handleToggleMenu}>
                <i className="pi pi-bars" />
            </Button>

            <div className='flex justify-content-end w-full'>
                <SplitButton label={userName && userName ? userName : 'Usuario'} model={items} text style={{
                    borderRadius: '0px'
                }} />
            </div >
        </div>
    );
};
