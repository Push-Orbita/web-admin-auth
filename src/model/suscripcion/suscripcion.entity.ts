import { MetadataEntity } from "../metadata.entity";

export interface SuscripcionResponse {
    data: SuscripcionEntity[];
    metadata: MetadataEntity;
}


export interface SuscripcionEntity {
    id?: number;
    nombre?: string;
    descripcion?: string;
}
