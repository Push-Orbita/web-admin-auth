export type PlanPatchDTO = Partial<PlanPostDTO> & { id: number };

export interface PlanPostDTO {
    nombre: string;
    descripcion: string;
    duracion: number,
    precio: number,
    suscripcion: number
}

export interface PlanDeleteDTO {
    id: number;
}