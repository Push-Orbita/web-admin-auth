import { stringValidation } from "@components/common/forms/validations/string.validations";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    // nombre: stringValidation({
    //     isRequired: true,
    //     min: 3
    // }),
});