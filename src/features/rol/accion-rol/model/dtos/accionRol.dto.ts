export type AccionRolPatchDTO = Partial<AccionRolPostDTO> & { id: number };

export interface AccionRolPostDTO {
    rol: number;
    accionPorModuloId: number;
}

export interface AccionRolDeleteDTO {
    id: number;
}