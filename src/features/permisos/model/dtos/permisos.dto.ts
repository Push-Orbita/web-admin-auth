export interface PermisosPostDTO {
    usuario: number;
    sistema: number;
    organizacion: number;
    rol: number;
}

export type PermisosPatchDTO = Partial<PermisosPostDTO> & { id: number };

export interface PermisosDeleteDTO {
    id: number;
} 