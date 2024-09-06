import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface ModuloResponse {
    data: ModuloEntity[];
    metadata: MetadataEntity;
}

export interface ModuloEntity {
    id:          number;
    nombre:      string;
    descripcion: string;
    label:       string;
    element:     string;
    icon:        string;
    path:        string;
    sistema:     Sistema;
}

export interface Sistema {
    id:           number;
    nombre:       string;
    descripcion:  string;
    url:          string;
    clientId:     string;
    clientSecret: string;
    icono:        string;
}
