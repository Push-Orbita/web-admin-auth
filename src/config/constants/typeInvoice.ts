export enum TipoFactura {
    FACTURA_A = 1,
    FACTURA_B = 6,
    FACTURA_C = 11,
    FACTURACREDITO_ELECTRONICA_A = 201,
    FACTURACREDITO_ELECTRONICA_B = 206,
    FACTURACREDITO_ELECTRONICA_C = 211,
    NOTA_CREDITO_A = 3,
    NOTA_CREDITO_B = 8,
    NOTA_CREDITO_C = 13
}

// Crear las opciones para el enum TipoFactura
export const TipoFacturaOptions = Object.keys(TipoFactura)
    .filter(key => isNaN(Number(key))) // Filtrar para evitar las claves numéricas (valores del enum)
    .map(key => ({
        nombre: key.replace(/_/g, ' '), // Reemplazar guiones bajos por espacios
        value: TipoFactura[key as keyof typeof TipoFactura] // Obtener el valor del enum
    }));

// Crear un array con todos los valores del enum TipoFactura
export const TipoFacturaValues = Object.values(TipoFactura)
    .filter(value => typeof value === 'number'); // Filtrar para obtener solo los valores numéricos

