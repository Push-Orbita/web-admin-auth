import { Button } from "primereact/button";
import { FC } from "react";
import { FormTextInput } from "../../../common/components/forms/FormTextInput";
import { useModuleContext } from "../../../hooks/useModules";
import { Form, useFormikContext } from "formik";
import { ActionsPostDTO } from "../../../model/dtos/actions/actions.dto";

const FormFields: FC = () => {
    const { setVisible } = useModuleContext();
    const { handleSubmit } = useFormikContext<ActionsPostDTO>()
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-6">
                    <FormTextInput label={'Nombre'} name={'nombre'}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <FormTextInput label={'Descripción'} name={'descripcion'}
                    />
                </div>
            </div>
            <div className="flex justify-content-end flex-wrap">
                <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                <Button type='submit' label="Guardar2" icon="pi pi-save" />
            </div>


        </Form>
    )
}

export default FormFields