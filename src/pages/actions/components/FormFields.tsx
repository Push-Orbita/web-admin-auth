import { Form, useFormikContext } from "formik"
import { ActionsPostDTO } from "../../../model/dtos/actions/actions.dto"
import { FC } from "react"
interface Props {
    onSubmit?: any;
}
const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ActionsPostDTO>()
    return (
        <>
            
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6">

                    </div>
                </div>
           

        </>
    )
}

export default FormFields