export type RazaTypePatchDTO = Partial<RazaTypePostDTO> & { id: number }

export interface RazaTypePostDTO {
    nombre?: string,
    descripcion?: string,
    especie?: number
}
export interface RazaTypeDeleteDTO {
    id: number
}
