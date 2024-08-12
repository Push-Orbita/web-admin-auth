export type EspecieTypePatchDTO = Partial<EspecieTypePostDTO> & { id: number }

export interface EspecieTypePostDTO {
    nombre: string,
    descripcion: string
}
export interface EspecieTypeDeleteDTO {
    id: number
}
