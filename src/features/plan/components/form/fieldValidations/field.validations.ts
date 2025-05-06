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
    descripcion: stringValidation({
        isRequired: true,
        min: 10,
        max: 500,
        trim: true
    }),
    duracion: numberValidation({
        isRequired: true,
        positive: true,
        min: 1
    }),
    precio: numberValidation({
        isRequired: true,
        positive: true,
        min: 0
    }),
    suscripcion: numberValidation({
        isRequired: true,
        positive: true
    })
}); 