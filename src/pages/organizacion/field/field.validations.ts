import { lang } from "../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Organization.validation.nameIsRequired.toString())),
    bd: Yup.string().required(t(lang.Organization.validation.dataBaseIsRequired.toString())),
    host: Yup.string().required(t(lang.Organization.validation.hostIsRequired.toString())),
    port: Yup.string().required(t(lang.Organization.validation.portIsRequired.toString())),
    usuario: Yup.string().required(t(lang.Organization.validation.userIsRequired.toString())),
    password: Yup.string().required(t(lang.Organization.validation.passwordIsRequired.toString())),
    tipodb: Yup.string().required(t(lang.Organization.validation.tipoBDIsRequired.toString()))

})
