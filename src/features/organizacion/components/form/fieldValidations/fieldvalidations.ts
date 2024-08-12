import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required(t(lang.Organizacion.validation.nameIsRequired.toString())),
    bd: Yup.string().required(t(lang.Organizacion.validation.dataBaseIsRequired.toString())),
    host: Yup.number().required(t(lang.Organizacion.validation.hostIsRequired.toString())),
    password: Yup.string().required(t(lang.Organizacion.validation.passwordIsRequired.toString())),
    port: Yup.number().required(t(lang.Organizacion.validation.portIsRequired.toString())),
    tipobd: Yup.string().required(t(lang.Organizacion.validation.dataBaseTypeIsRequired.toString())),
    usuario: Yup.string().required(t(lang.Organizacion.validation.userIsRequired.toString())),
});