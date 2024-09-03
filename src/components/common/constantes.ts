export enum GeneroEnum {
    FEMENINO = 'F',
    MASCULINO = 'M',
    OTRO = 'O',
    PREFIERO_NO_DECIRLO = 'P'
}

export const GeneroOptions = Object.keys(GeneroEnum).map(key => ({
    nombre: key.replace(/_/g, ' '),
    value: GeneroEnum[key as keyof typeof GeneroEnum]
}));

export const GeneroValues = Object.values(GeneroEnum);