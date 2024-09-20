import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";
import { GeneroValues } from "@components/common/constantes";
const cuilValidation = Yup.string()
    .required(t(lang.Person.validation.cuilIsRequired.toString()))
    .max(11, t(lang.Person.validation.cuilMaxLength.toString()))
    .trim()
    .transform(value => value.replace(/-/g, ''))
    .test(
        'is-valid-cuil',
        t(lang.Person.validation.cuilInvalid.toString()),
        value => {
            if (!value) return false;
            return value.length === 11 && /^\d+$/.test(value) && parseInt(value, 10) > 0;
        }
    );
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string()
        .required(t(lang.Person.validation.nameIsRequired.toString())),
    apellido: Yup.string()
        .required(t(lang.Person.validation.lastNameIsRequired.toString())),
    cuil: cuilValidation,
    genero: Yup.mixed()
        .oneOf(GeneroValues, t(lang.Person.validation.invalidGender.toString()))
        .required(t(lang.Person.validation.genderIsRequired.toString())),
});

