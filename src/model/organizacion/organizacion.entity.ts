import { MetadataEntity } from "../metadata.entity";

export interface ActionsResponse {
    data: OrganizacionEntity[];
    metadata: MetadataEntity;
}

export interface OrganizacionEntity {
    id: number;
    nombre: string;
    bd: string;
    host: string;
    port: number;
    usuario: string;
    password: string;
    tipobd: string;
}