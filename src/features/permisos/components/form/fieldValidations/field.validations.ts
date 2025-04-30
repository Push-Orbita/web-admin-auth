import { numberValidation } from '@components/common/forms/validations/number.validations';
import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    usuario: numberValidation({
        required: true,
        positive: true
    }),
    sistema: numberValidation({
        required: true,
        positive: true
    }),
    organizacion: numberValidation({
        required: true,
        positive: true
    }),
    rol: numberValidation({
        required: true,
        positive: true
    })
}); 