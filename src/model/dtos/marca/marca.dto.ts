export type MarcaPatchDTO = Partial<MarcaPostDTO> & { id: number }

export interface MarcaPostDTO {
    nombre?: string
}
export interface MarcaDeleteDTO {
    id: number
}
