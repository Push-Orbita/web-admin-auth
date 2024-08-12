import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";
export interface EspecieTypeResponse {
    data: EspecieTypeEntity[];
    metadata: MetadataEntity;
}
export interface EspecieTypeEntity {
    id: number;
    nombre?: string;
    descripcion?: string;
}
