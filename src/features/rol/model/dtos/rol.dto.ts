export type RolPatchDTO = Partial<RolPostDTO> & { id: number };


export interface RolDeleteDTO {
    id: number;
}export interface RolPostDTO {
    nombre: string;
    descripcion: string;
    accionesPorRol: AccionesPorRol[];
    sistema?: number;
    modulosSeleccionados?: number[];
}

export interface AccionesPorRol {
    rol: number;
    accionPorModulo: number;
}
