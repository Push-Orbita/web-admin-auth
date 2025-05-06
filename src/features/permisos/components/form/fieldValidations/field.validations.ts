import { numberValidation } from '@components/common/forms/validations/number.validations';
import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    usuario: numberValidation({
        isRequired: true,
        positive: true
    }),
    sistema: numberValidation({
        isRequired: true,
        positive: true
    }),
    organizacion: numberValidation({
        isRequired: true,
        positive: true
    }),
    rol: numberValidation({
        isRequired: true,
        positive: true
    })
}); 