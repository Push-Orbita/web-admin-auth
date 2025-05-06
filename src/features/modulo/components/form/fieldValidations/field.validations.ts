import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    // nombre: Yup.string().required(t(lang.modulo.validation.nombreIsRequired.toString())),
});