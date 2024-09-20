export type RolPatchDTO = Partial<RolPostDTO> & { id: number };

export interface RolPostDTO {
    nombre: string;
    descripcion: string;
}

export interface RolDeleteDTO {
    id: number;
}