import { stringValidation } from '@components/common/forms/validations/string.validations';
import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    nombre: stringValidation({
        isRequired: true,
        min: 3,
        max: 50,
        trim: true
    }),
    descripcion: stringValidation({
        isRequired: true,
        min: 10,
        max: 200,
        trim: true
    }),
    accionesPorRol: Yup.array().of(
        Yup.object().shape({
            nombre: stringValidation({
                isRequired: true,
                min: 3,
                max: 50,
                trim: true
            }),
            descripcion: stringValidation({
                isRequired: true,
                min: 10,
                max: 200,
                trim: true
            }),
            permisosDeAcceso: Yup.array().of(
                Yup.object().shape({
                    nombre: stringValidation({
                        isRequired: true,
                        min: 3,
                        max: 50,
                        trim: true
                    }),
                    descripcion: stringValidation({
                        isRequired: true,
                        min: 10,
                        max: 200,
                        trim: true
                    })
                })
            )
        })
    )
}); 