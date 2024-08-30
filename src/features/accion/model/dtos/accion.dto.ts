export type AccionPatchDTO = Partial<AccionPostDTO> & { id: number };

export interface AccionPostDTO {
    nombre: string;
    descripcion: string;
}

export interface AccionDeleteDTO {
    id: number;
}