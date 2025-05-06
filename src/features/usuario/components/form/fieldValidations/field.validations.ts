import { stringValidation } from '@components/common/forms/validations/string.validations';
import { numberValidation } from '@components/common/forms/validations/number.validations';
import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    nombre: stringValidation({
        isRequired: true,
        min: 2,
        max: 100,
        trim: true
    }),
    email: stringValidation({
        isRequired: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    }),
    password: stringValidation({
        isRequired: true,
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
        isRequired: true,
        positive: true
    })
}); 