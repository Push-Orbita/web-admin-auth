export type OrganizacionPatchDTO = Partial<OrganizacionPostDTO> & { id: number };

export interface OrganizacionPostDTO {
    nombre?: string;
    bd?: string;
    host?: string;
    port?: number;
    usuario?: string;
    passwordbd?: string;
    tipobd?: string;
}

export interface OrganizacionDeleteDTO {
    id: number;
}