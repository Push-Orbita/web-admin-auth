export type UsuarioPatchDTO = Partial<UsuarioPostDTO> & { id: number }
export interface UsuarioPostDTO {
    nombre: string,
    email: string,
    password: string,
    repeatPassword: string
}
export interface UsuarioDeleteDTO {
    id: number
}