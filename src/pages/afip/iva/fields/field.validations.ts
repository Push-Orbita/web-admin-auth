import { lang } from "../../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    descripcion: Yup.string().required(t(lang.IvaType.validation.descriptionIsRequired.toString())),
    porcentaje: Yup.number().required(t(lang.IvaType.validation.percentIsRequired.toString())),
})
