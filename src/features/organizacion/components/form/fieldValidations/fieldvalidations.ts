import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Organizacion.validation.nameIsRequired.toString())).trim(),
    bd: Yup.string().required(t(lang.Organizacion.validation.dataBaseIsRequired.toString())).trim(),
    host: Yup.string().required(t(lang.Organizacion.validation.hostIsRequired.toString())).trim(),
    password: Yup.string().required(t(lang.Organizacion.validation.passwordIsRequired.toString())),
    port: Yup.number().required(t(lang.Organizacion.validation.portIsRequired.toString())),
    tipobd: Yup.string().required(t(lang.Organizacion.validation.dataBaseTypeIsRequired.toString())).trim(),
    usuario: Yup.string().required(t(lang.Organizacion.validation.userIsRequired.toString())).trim(),
});