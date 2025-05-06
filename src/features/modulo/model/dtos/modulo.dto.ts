export interface AccionPorModuloDTO {
    accion: number;
}

export interface AccionPorModuloPatchDTO {
    modulo: number;
    accion: number;
}

export interface ModuloDTO {
    nombre: string;
    descripcion: string;
    label: string;
    element: string;
    icon: string;
    path: string;
    moduloPadre: number | null;
    sistema: number;
    accionesPorModulo: number[];
}

export interface ModuloData {
    nombre: string;
    descripcion: string;
    label: string;
    element: string;
    icon: string;
    path: string;
    moduloPadre: number | null;
    sistema: number;
    accionesPorModulo: AccionPorModuloDTO[] | AccionPorModuloPatchDTO[];
}

export type ModuloPostDTO = ModuloData | ModuloData[];

export type ModuloPatchDTO = Partial<ModuloDTO> & { id: number };

export interface ModuloDeleteDTO {
    id: number;
} 