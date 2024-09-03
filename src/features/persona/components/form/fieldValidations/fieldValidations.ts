import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";
import { GeneroValues } from "@components/common/constantes";

export const fieldValidations = Yup.object().shape({
    nombre: Yup.string()
        .required(t(lang.Person.validation.nameIsRequired.toString())),
    apellido: Yup.string()
        .required(t(lang.Person.validation.lastNameIsRequired.toString())),
    cuil: Yup.number()
        .typeError(t(lang.Person.validation.cuilMustBeNumber.toString()))
        .required(t(lang.Person.validation.cuilIsRequired.toString()))
        .positive(t(lang.Person.validation.cuilMustBePositive.toString()))
        .integer(t(lang.Person.validation.cuilMustBeInteger.toString()))
        .max(99999999999, t(lang.Person.validation.cuilMaxLength.toString())),
    genero: Yup.mixed()
        .oneOf(GeneroValues, t(lang.Person.validation.invalidGender.toString()))
        .required(t(lang.Person.validation.genderIsRequired.toString())),
});