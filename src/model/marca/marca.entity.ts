import { MetadataEntity } from "../metadata.entity";

export interface ActionsResponse {
    data: MarcaEntity[];
    metadata: MetadataEntity;
}



export interface MarcaEntity {
    id: number;
    nombre: string;
}


