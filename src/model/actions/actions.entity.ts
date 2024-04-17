import { MetadataEntity } from "../metadata.entity";

export interface ActionsResponse {
  data: ActionsEntity[];
  metadata: MetadataEntity;
}

export interface ActionsEntity {
  id: number;
  nombre:string;
  descripcion: string;
  
}
