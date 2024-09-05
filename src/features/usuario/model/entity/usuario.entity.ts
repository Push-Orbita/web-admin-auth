import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface UsuarioResponse {
    data: UsuarioEntity[];
    metadata: MetadataEntity;
}

export interface UsuarioEntity {
    id: number;
    nombre: string;
    email: string;
    password: string;
    persona?: Persona;
}

export interface Persona {
    id: number;
    cuil: string;
    nombre: string;
    apellido: string;
    genero: string;
}
