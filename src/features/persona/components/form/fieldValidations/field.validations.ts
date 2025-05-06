import { stringValidation } from '@components/common/forms/validations/string.validations';
import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    nombre: stringValidation({
        isRequired: true,
        min: 2,
        max: 50,
        trim: true
    }),
    apellido: stringValidation({
        isRequired: true,
        min: 2,
        max: 50,
        trim: true
    }),
    cuil: stringValidation({
        isRequired: true,
        pattern: /^\d{2}-\d{8}-\d{1}$/,
    }),
    genero: stringValidation({
        isRequired: true
    })
}); 