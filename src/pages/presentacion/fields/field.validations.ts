import { lang } from "../../../langs"
import { t } from "i18next"
import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.PresentacionType.validation.nameIsRequired.toString()))
    .min(3,t(lang.PresentacionType.validation.nameMinLength.toString()))
    .test(
        'is-uppercase',
        t(lang.PresentacionType.validation.nameUppercase.toString()),
        (value) => value ? value === value.toUpperCase():true
    ),
    siglas: Yup.string().required(t(lang.PresentacionType.validation.acronymIsRequired.toString())),

})
