import { stringValidation } from '@components/common/forms/validations/string.validations';
import { numberValidation } from '@components/common/forms/validations/number.validations';
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
    email: stringValidation({
        isRequired: true,
        email: true,
        trim: true
    }),
    password: stringValidation({
        isRequired: true,
        min: 6,
        max: 20,
        min: 8,
        max: 50,
        trim: true
    }),
    repeatPassword: stringValidation({
        isRequired: true,
        min: 8,
        max: 50,
        trim: true
    }).oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
    persona: numberValidation({
        required: true,
        positive: true
    })
}); 