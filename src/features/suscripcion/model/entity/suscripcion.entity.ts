import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface SuscripcionResponse {
    data: SuscripcionEntity[];
    metadata: MetadataEntity;
}

export interface SuscripcionEntity {
    id: number;
    nombre?: string;
    descripcion?: string;
}