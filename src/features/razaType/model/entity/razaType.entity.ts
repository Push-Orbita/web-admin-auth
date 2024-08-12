import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface RazaTypeResponse {
    data: RazaTypeEntity[];
    metadata: MetadataEntity;
}
export interface RazaTypeEntity {
    id: number;
    nombre?: string;
    descripcion?: string;
}

