import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Action.validation.nameIsRequired.toString())).trim(),
    descripcion: Yup.string().required(t(lang.Action.validation.descriptionIsRequired.toString())).trim(),
});