import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface PersonaResponse {
    data: PersonaEntity[];
    metadata: MetadataEntity;
}

export interface PersonaEntity {
    id: number;
    nombre: string;
    apellido: string;
    cuil: string;
    genero: string;
} 