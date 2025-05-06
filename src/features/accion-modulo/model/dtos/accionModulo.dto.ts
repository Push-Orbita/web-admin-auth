export interface AccionModuloFormDTO {
    id?: number;
    modulo: number;
    accion: number[];
}

export interface AccionModuloPostDTO {
    modulo: number;
    accion: number[];
}

export interface AccionModuloPatchDTO {
    id: number;
    modulo: number;
    accion: number;
}

export interface AccionModuloDeleteDTO {
    id: number;
} 