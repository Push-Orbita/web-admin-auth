export type SistemasPatchDTO = Partial<SistemasPostDTO> & { id: number };

export interface SistemasPostDTO {
    nombre: string;
    descripcion: string;
    url: string;
    icono: string;
    host: string;
    port: number;
    usuario: string;
    password2: string;
    tipobd: string;
}

export interface SistemasDeleteDTO {
    id: number;
}

export interface PrivateDataRequest {
    password: string;
    sistemaId: number;
}
