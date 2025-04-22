export enum TipoOperacion {
    VENTA = 1,
    REMITO = 2,
    COTIZACION = 3,
    APARTADO = 4
}

// Crear las opciones para el enum TipoOperacion
export const TipoOperacionOptions = Object.keys(TipoOperacion)
    .filter(key => isNaN(Number(key))) // Filtrar para evitar las claves numéricas (valores del enum)
    .map(key => ({
        nombre: key.replace(/_/g, ' '), // Reemplazar guiones bajos por espacios
        value: TipoOperacion[key as keyof typeof TipoOperacion] // Obtener el valor del enum
    }));

// Crear un array con todos los valores del enum TipoOperacion
export const TipoOperacionValues = Object.values(TipoOperacion)
    .filter(value => typeof value === 'number'); // Filtrar para obtener solo los valores numéricos