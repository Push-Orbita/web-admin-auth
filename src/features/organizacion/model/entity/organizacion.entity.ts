import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface OrganizacionResponse {
    data: OrganizacionEntity[];
    metadata: MetadataEntity;
}

export interface OrganizacionEntity {
    id: number;
    nombre: string;
} 