import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    usuario: Yup.number()
        .required(t(lang.Permissions.validation.userIsRequired.toString()))
        .notOneOf([0], t(lang.Permissions.validation.userMustBeDifferentFromZero.toString())),
    sistema: Yup.number()
        .required(t(lang.Permissions.validation.systemIsRequired.toString()))
        .notOneOf([0], t(lang.Permissions.validation.systemMustBeDifferentFromZero.toString())),
    organizacion: Yup.number()
        .required(t(lang.Permissions.validation.organizationIsRequired.toString()))
        .notOneOf([0], t(lang.Permissions.validation.organizationMustBeDifferentFromZero.toString())),
    rol: Yup.number()
        .required(t(lang.Permissions.validation.rolIsRequired.toString()))
        .notOneOf([0], t(lang.Permissions.validation.rolMustBeDifferentFromZero.toString())),
});