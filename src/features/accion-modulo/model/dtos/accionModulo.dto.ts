export type AccionModuloPatchDTO = Partial<AccionModuloPostDTO> & { id: number };

export interface AccionModuloPostDTO {
    modulo: number;
    accion: number;
}

export interface AccionModuloDeleteDTO {
    id: number;
}