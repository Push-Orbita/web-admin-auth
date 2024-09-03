import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface PersonaResponse {
    data: PersonaEntity[];
    metadata: MetadataEntity;
}

export interface PersonaEntity {
    id: number;
    cuil: string;
    nombre: string;
    apellido: string;
    genero: string;
    usuarios?: Usuario[] | undefined | null;
}

export interface Usuario {
    id?: number;
    nombre?: string;
    email?: string;
    password?: string;
}
