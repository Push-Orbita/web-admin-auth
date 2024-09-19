import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    modulo: Yup.number()
        .required(t(lang.ActionModule.validation.moduleIsRequired.toString()))
        .notOneOf([0], t(lang.ActionModule.validation.moduleMustBeDifferentFromZero.toString())), // Validación para que sea distinto de 0
    accion: Yup.number()
        .required(t(lang.ActionModule.validation.acctionIsRequired.toString()))
        .notOneOf([0], t(lang.ActionModule.validation.acctionMustBeDifferentFromZero.toString())), // Validación para que sea distinto de 0
});