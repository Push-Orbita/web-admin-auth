export enum GeneroEnum {
    FEMENINO = 'F',
    MASCULINO = 'M',
    OTRO = 'O',
    PREFIERO_NO_DECIRLO = 'P'
}

// Establecemos FEMENINO como valor por defecto
export const DEFAULT_GENERO = GeneroEnum.FEMENINO;

// Crear las opciones para el enum GeneroEnum
export const GeneroOptions = Object.keys(GeneroEnum)
    .filter(key => isNaN(Number(key))) // Filtrar para evitar las claves numéricas
    .map(key => ({
        nombre: key.replace(/_/g, ' '), // Reemplazar guiones bajos por espacios
        value: GeneroEnum[key as keyof typeof GeneroEnum] // Obtener el valor del enum
    }));

// Crear un array con todos los valores del enum GeneroEnum
export const GeneroValues = Object.values(GeneroEnum)
    .filter(value => typeof value === 'string'); // Filtrar para obtener solo los valores string
