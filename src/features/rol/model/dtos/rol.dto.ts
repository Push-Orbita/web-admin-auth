export type RolPatchDTO = Partial<RolPostDTO> & { id: number };


export interface RolDeleteDTO {
    id: number;
}
export interface RolPostDTO {
    nombre: string;
    descripcion: string;
    accionesPorRol: AccionesPorRol[];
}

export interface AccionesPorRol {
    accionPorModulo: number;
}
