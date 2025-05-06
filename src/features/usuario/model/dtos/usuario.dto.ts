export interface UsuarioPostDTO {
    nombre: string;
    email: string;
    password: string;
    repeatPassword: string;
    persona: number;
}

export type UsuarioPatchDTO = Partial<UsuarioPostDTO> & { id: number };

export interface UsuarioDeleteDTO {
    id: number;
} 