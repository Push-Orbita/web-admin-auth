import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface PlanResponse {
    data: PlanEntity[];
    metadata: MetadataEntity;
}

export interface PlanEntity {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
    suscripcion: number;
} 