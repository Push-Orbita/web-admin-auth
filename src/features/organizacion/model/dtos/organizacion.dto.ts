export interface OrganizacionPostDTO {
    nombre: string;
}

export type OrganizacionPatchDTO = Partial<OrganizacionPostDTO> & { id: number };

export interface OrganizacionDeleteDTO {
    id: number;
} 