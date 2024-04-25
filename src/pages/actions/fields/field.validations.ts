import { lang } from "../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.ActionsType.validation.nameIsRequired.toString())),
    descripcion: Yup.string().required(t(lang.ActionsType.validation.descriptionIsRequired.toString())),
})
