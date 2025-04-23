export enum TYPEBD {
    MYSQL = 'mysql',
    POSTGRESQL = 'postgresql',
    SQLSERVER = 'sqlserver',
    ORACLE = 'oracle',
    MONGODB = 'mongodb'
}

// Establecemos MYSQL como valor por defecto
export const DEFAULT_TYPEBD = TYPEBD.MYSQL;

// Crear las opciones para el enum TYPEBD
export const TYPEBDOptions = Object.keys(TYPEBD)
    .filter(key => isNaN(Number(key))) // Filtrar para evitar las claves numéricas
    .map(key => ({
        nombre: key.replace(/_/g, ' '), // Reemplazar guiones bajos por espacios
        value: TYPEBD[key as keyof typeof TYPEBD] // Obtener el valor del enum
    }));

// Crear un array con todos los valores del enum TYPEBD
export const TYPEBDValues = Object.values(TYPEBD)
    .filter(value => typeof value === 'string'); // Filtrar para obtener solo los valores string 