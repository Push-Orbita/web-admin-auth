import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
    usuario: Yup.number().positive(),
    sistema: Yup.number().positive(),
    organizacion: Yup.number().positive(),
    rol: Yup.number().positive(),
    nombre: Yup.string().required("El nombre es requerido"),
    descripcion: Yup.string().required("La descripción es requerida"),
    codigo: Yup.string().required("El código es requerido")
}); 