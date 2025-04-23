import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface UsuarioResponse {
    data: UsuarioEntity[];
    metadata: MetadataEntity;
}

export interface UsuarioEntity {
    id: number;
    nombre: string;
    email: string;
    persona: number;
} 