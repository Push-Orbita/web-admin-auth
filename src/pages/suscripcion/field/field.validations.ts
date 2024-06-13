import { lang } from "../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Suscripcion.validation.nameIsRequired.toString())),
    descripcion: Yup.string().required(t(lang.Suscripcion.validation.nameIsRequired.toString())),
    sistema: Yup.mixed().required(t(lang.Suscripcion.validation.systemIsRequired.toString())),
})
