import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Suscripcion.validation.nameIsRequired.toString())),
    descripcion: Yup.string().required(t(lang.Suscripcion.validation.descriptionIsRequired.toString())),
    sistema: Yup.string().required(t(lang.Suscripcion.validation.sistemaIsRequired.toString())),
});