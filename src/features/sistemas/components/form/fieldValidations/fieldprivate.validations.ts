import * as Yup from 'yup';
import { stringValidation } from '@components/common/forms/validations/string.validations';
import { numberValidation } from '@components/common/forms/validations/number.validations';

export const fieldPrivateValidations = Yup.object().shape({
    host: stringValidation({
        isRequired: true,
        isUrl: true,
        spaces: {
            allowEmpty: false,
            allowLeading: false,
            allowTrailing: false
        }
    }),
    port: numberValidation({
        isRequired: true,
        integer: true,
        positive: true,
        range: {
            min: 1,
            max: 65535
        }
    }),
    usuario: stringValidation({
        isRequired: true,
        spaces: {
            allowEmpty: false,
            allowLeading: false,
            allowTrailing: false
        }
    }),
    passwordbd: stringValidation({
        isRequired: true,
        min: 4,
        spaces: {
            allowEmpty: false,
            allowLeading: false,
            allowTrailing: false
        }
    }),
    tipobd: stringValidation({
        isRequired: true,
        allowedValues: ['mysql', 'postgresql', 'sqlserver', 'oracle', 'mongodb']
    })
});
