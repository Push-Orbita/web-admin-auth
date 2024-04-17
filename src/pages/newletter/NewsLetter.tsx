import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useState } from 'react';
import { CustomBasicModal } from '../../common/components/modal/CustomBasicModal';
import { usePermisos } from '../../hooks/usePermisos';
import { DashboardLayout } from '../../layout/DashboardLayout';
import { FormNewsletter } from './components/FormNewsletter';
import { TestTable } from './components/TestTable';
import { CustomBreadcrumb } from '../../common/components/ui/CustomBreadcrumb';


const NewsLetter = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const permisos = usePermisos();

    const startToolbarTemplate = () => {
        return (
            <>
                <div className="my-2">
                    {permisos.puedeAgregar ? (<Button label="Nuevo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={() => setVisible(true)} />) : ""}
                </div>

            </>
        );
    };
    return (
        <DashboardLayout>
          <CustomBreadcrumb />
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
            <CustomBasicModal
                visible={visible}
                setVisible={setVisible}
            >
                <FormNewsletter setVisible={setVisible} />
            </CustomBasicModal>


        </DashboardLayout >
    )
}


export default NewsLetter;