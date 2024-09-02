import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface ContratoResponse {
    data: ContratoEntity[];
    metadata: MetadataEntity;
}


export interface ContratoEntity {
    id: number;
    fechaVencimiento: Date;
    plan: Plan;
    organizacion: Organizacion;
}

export interface Organizacion {
    id: number;
    nombre: string;
    bd: string;
    host: string;
    port: number;
    usuario: string;
    password: string;
    tipobd: string;
}

export interface Plan {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
}
