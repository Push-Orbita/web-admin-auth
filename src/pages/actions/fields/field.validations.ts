import * as Yup from "yup"
export const fieldValidations = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    descripcion: Yup.string().required('La descripcion es requerida'),
})
