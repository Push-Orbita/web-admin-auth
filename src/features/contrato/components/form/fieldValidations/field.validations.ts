import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    plan: Yup.number()
        .required(t(lang.ActionModule.validation.moduleIsRequired.toString()))
        .notOneOf([0], t(lang.ActionModule.validation.moduleMustBeDifferentFromZero.toString())),
    organizacion: Yup.number()
        .required(t(lang.ActionModule.validation.moduleIsRequired.toString()))
        .notOneOf([0], t(lang.ActionModule.validation.moduleMustBeDifferentFromZero.toString())),
});