import { MetadataEntity } from "../metadata.entity";

export interface UsuarioResponse {
    data: UsuarioEntity[];
    metadata: MetadataEntity;
}

export interface UsuarioEntity {
    id?: number;
    nombre?: string;
    email?: string;
    password?: string;
}
