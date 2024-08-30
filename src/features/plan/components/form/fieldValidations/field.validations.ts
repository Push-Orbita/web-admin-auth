import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Plan.validation.nameIsRequired.toString())),
    descripcion: Yup.string().required(t(lang.Plan.validation.descriptionIsRequired.toString())),
    duracion: Yup.number().required(t(lang.Plan.validation.durationIsRequired.toString())),
    precio: Yup.number().required(t(lang.Plan.validation.priceIsRequired.toString())),
    suscripcion: Yup.number().required(t(lang.Plan.validation.ssubscriptionIsRequired.toString())),
});