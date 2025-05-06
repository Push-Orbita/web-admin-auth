import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface ContratoResponse {
    data: ContratoEntity[];
    metadata: MetadataEntity;
}

export interface ContratoEntity {
    id: number;
    fechaVencimiento: string;
    plan: number;
    organizacion: number;
} 