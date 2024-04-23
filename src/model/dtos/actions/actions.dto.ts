export type ActionsPatchDTO = Partial<ActionsPostDTO> & { id: number }

export interface ActionsPostDTO {
    nombre?: string,
    descripcion?: string
}
export interface ActionsDeleteDTO {
    id: number
}
