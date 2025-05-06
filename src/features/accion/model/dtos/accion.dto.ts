export interface AccionPostDTO {
    nombre: string;
    descripcion: string;
}

export type AccionPatchDTO = Partial<AccionPostDTO> & { id: number };

export interface AccionDeleteDTO {
    id: number;
} 