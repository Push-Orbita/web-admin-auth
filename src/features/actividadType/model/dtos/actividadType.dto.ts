export type ActividadTypePatchDTO = Partial<ActividadTypePostDTO> & { id: number }

export interface ActividadTypePostDTO {
    nombre: string,
    descripcion: string
}
export interface ActividadTypeDeleteDTO {
    id: number
}
