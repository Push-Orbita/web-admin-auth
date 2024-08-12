import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";
export interface ActividadTypeResponse {
    data: ActividadTypeEntity[];
    metadata: MetadataEntity;
}
export interface ActividadTypeEntity {
    id: number;
    nombre: string;
    descripcion: string;
}
