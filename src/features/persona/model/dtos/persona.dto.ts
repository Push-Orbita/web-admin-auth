export interface PersonaPostDTO {
    nombre: string;
    apellido: string;
    cuil: string;
    genero: string;
}

export type PersonaPatchDTO = Partial<PersonaPostDTO> & { id: number };

export interface PersonaDeleteDTO {
    id: number;
} 