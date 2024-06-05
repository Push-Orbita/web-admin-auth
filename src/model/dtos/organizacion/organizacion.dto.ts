export type OrganizacionPatchDTO = Partial<OrganizacionPostDTO> & { id: number }

export interface OrganizacionPostDTO {
    nombre: string,
    bd: string,
    host: string,
    port: number | null,
    usuario: string,
    password: string | null,
    tipobd: string
}
export interface OrganizacionDeleteDTO {
    id: number
}
