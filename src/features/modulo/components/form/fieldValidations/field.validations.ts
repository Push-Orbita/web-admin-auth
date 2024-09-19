import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    sistema: Yup.number()
        .required(t(lang.ActionModule.validation.moduleIsRequired.toString()))
        .notOneOf([0], t(lang.ActionModule.validation.moduleMustBeDifferentFromZero.toString())),
    body: Yup.array().of(
        Yup.object().shape({
            nombre: Yup.string().required(t(lang.Module.validation.nameIsRequired.toString())),
            descripcion: Yup.string().required(t(lang.Module.validation.descriptionIsRequired.toString())),
            element: Yup.string().required(t(lang.Module.validation.elementIsRequired.toString())),
            icon: Yup.string().optional(),
            label: Yup.string().required(t(lang.Module.validation.labelIsRequired.toString())),
            moduloPadre: Yup.number().optional(),
            path: Yup.string().required(t(lang.Module.validation.pathIsRequired.toString())),
        })
    ),
});