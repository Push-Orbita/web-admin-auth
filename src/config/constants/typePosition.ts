export enum TypePosition {
    IZQUIERDA = 'left',
    DERECHA = 'right',
}

// Crear las opciones para el enum TipoFactura
export const TypePositionOptions = Object.keys(TypePosition)
    .filter(key => isNaN(Number(key))) // Filtrar para evitar las claves numéricas (valores del enum)
    .map(key => ({
        nombre: key.replace(/_/g, ' '), // Reemplazar guiones bajos por espacios
        value: TypePosition[key as keyof typeof TypePosition] // Obtener el valor del enum
    }));

// Crear un array con todos los valores del enum TipoFactura
export const TypePositionValues = Object.values(TypePosition); // Obtener todos los valores del enum
