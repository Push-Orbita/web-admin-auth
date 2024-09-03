import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Person.validation.nameIsRequired.toString())),
    apellido: Yup.string().required(t(lang.Person.validation.lastNameIsRequired.toString())),
});