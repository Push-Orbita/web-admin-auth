export type PresentacionPatchDTO = Partial<PresentacionPostDTO> & { id: number }

export interface PresentacionPostDTO {
    nombre?: string
    siglas?: string
}
export interface PresentacionDeleteDTO {
    id: number
}
