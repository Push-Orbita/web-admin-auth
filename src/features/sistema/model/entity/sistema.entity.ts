import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface SistemaResponse {
    data: SistemaEntity[];
    metadata: MetadataEntity;
}

export interface SistemaEntity {
    id: number;
    nombre?: string;
    descripcion?: string;
    url?: string,
    icono?: string
}