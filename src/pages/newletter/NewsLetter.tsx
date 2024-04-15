import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../layout/DashboardLayout';
import { FormNewsletter } from './components/FormNewsletter';
import { TestTable } from './components/TestTable';


const NewsLetter = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const navigate = useNavigate()
   
    const startToolbarTemplate = () => {
        return (
            <Fragment>
                <div className="my-2">
                    <Button label="Nuevo Modal" icon="pi pi-plus" severity="success" className=" mr-2" onClick={() => setVisible(true)} />
                </div>
                <div className="my-2">
                    <Button label="Nuevo En Pantalla" icon="pi pi-plus" severity="success" className=" mr-2" onClick={() => navigate('/news-letter/create')} />
                </div>
            </Fragment>
        );
    };
    return (
        <DashboardLayout>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        <Toolbar className="mb-4" start={startToolbarTemplate}></Toolbar>
                    </div>
                </div>
                <div>
                   <TestTable />
                </div>
            </div>
            <Dialog header="Nueva Entrada" visible={visible} style={{ width: '80vw' }} onHide={() => setVisible(false)} >
                <div className="m-0">
                    <div className="col-12">
                        <div className="card">
                            <FormNewsletter setVisible={setVisible} />
                        </div>
                    </div>
                </div>
            </Dialog>
        </DashboardLayout >
    )
}


export default NewsLetter;