import { Dialog } from 'primereact/dialog';
interface Props {
    children?: React.ReactNode,
    title?: string,
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CustomBasicModal = ({ children, title,visible,setVisible}: Props) => {
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
