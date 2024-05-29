import { MetadataEntity } from "../metadata.entity";

export interface ActionsResponse {
    data: PresentacionEntity[];
    metadata: MetadataEntity;
}



export interface PresentacionEntity {
    id: number;
    nombre: string;
    siglas: string;
}


