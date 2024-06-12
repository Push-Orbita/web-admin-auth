export type SuscripcionPatchDTO = Partial<SuscripcionPostDTO> & { id: number }
export interface SuscripcionPostDTO {
    nombre: string;
    descripcion: string;
    sistema: number;
}
export interface SucripcionDeleteDTO {
    id: number
}