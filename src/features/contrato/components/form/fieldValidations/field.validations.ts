import { stringValidation } from '@components/common/forms/validations/string.validations';
import { numberValidation } from '@components/common/forms/validations/number.validations';
import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    fechaVencimiento: stringValidation({
        isRequired: true,
    }),
    plan: numberValidation({
        isRequired: true,
        positive: true
    }),
    organizacion: numberValidation({
        isRequired: true,
        positive: true
    })
}); 