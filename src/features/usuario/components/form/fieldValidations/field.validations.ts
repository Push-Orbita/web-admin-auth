import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.User.validation.nameIsRequired.toString())),
    email: Yup.string().required(t(lang.User.validation.emailIsRequired.toString())),
});