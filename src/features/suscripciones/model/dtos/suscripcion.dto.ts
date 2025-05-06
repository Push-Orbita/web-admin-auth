export type SuscripcionPatchDTO = Partial<SuscripcionPostDTO> & { id: number };

export interface SuscripcionPostDTO {
    nombre: string;
    descripcion: string;
}

export interface SuscripcionDeleteDTO {
    id: number;
}