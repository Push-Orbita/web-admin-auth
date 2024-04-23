import { Dialog } from 'primereact/dialog';
import { useModuleContext } from '../../../hooks/useModules';
interface Props {
    children?: React.ReactNode,
    title?: string,
}
export const CustomBasicModal = ({ children, title}: Props) => {
    const {  visible, setVisible } = useModuleContext();
   
    return (
        <Dialog header={title} visible={visible} style={{ width: '80vw' }} onHide={() => setVisible(false)} >
            <div className="m-0">
                <div className="col-12">
                    <div className="card">
                        {children}
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
