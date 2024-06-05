import { MetadataEntity } from "../metadata.entity";

export interface SistemaResponse {
    data: SistemaEntity[];
    metadata: MetadataEntity;
}


export interface SistemaEntity {
    id:           number;
    nombre:       string;
    descripcion:  string | null;
    url:          string | null;
    clientId:     string | null;
    clientSecret: string |null;
    icono:        string | null;
}

