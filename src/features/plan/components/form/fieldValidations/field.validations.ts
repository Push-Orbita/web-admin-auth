import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Plan.validation.nameIsRequired.toString())).trim(),
    descripcion: Yup.string().required(t(lang.Plan.validation.descriptionIsRequired.toString())).trim(),
    duracion: Yup.number().required(t(lang.Plan.validation.durationIsRequired.toString())),
    precio: Yup.number().required(t(lang.Plan.validation.priceIsRequired.toString())).transform(value => value.replace(/[^0-9]/g, '')),
    suscripcion: Yup.number()
        .required(t(lang.ActionModule.validation.moduleIsRequired.toString()))
        .notOneOf([0], t(lang.ActionModule.validation.moduleMustBeDifferentFromZero.toString())),
});