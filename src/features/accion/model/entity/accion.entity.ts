import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface AccionResponse {
    data: AccionEntity[];
    metadata: MetadataEntity;
}

export interface AccionEntity {
    id: number;
    nombre: string;
    descripcion: string;
} 