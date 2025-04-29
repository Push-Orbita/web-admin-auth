import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    modulo: Yup.number()
        .required('El módulo es obligatorio')
        .min(1, 'Debe seleccionar un módulo válido'),
    // accion: Yup.array()
    //     .of(Yup.number())
    //     .min(1, 'Debe seleccionar al menos una acción')
    //     .required('Las acciones son obligatorias')
}); 