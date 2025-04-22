import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface SistemasResponse {
    data: SistemasEntity[];
    metadata: MetadataEntity;
}
export interface SistemasEntity {
    id: number;
    nombre: string;
    descripcion: string;
    url: string;
    icono: string;
}
