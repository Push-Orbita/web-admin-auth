import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface RolResponse {
    data: RolEntity[];
    metadata: MetadataEntity;
}


export interface RolEntity {
    id: number;
    nombre: string;
    descripcion: string;
    accionesPorRol: AccionesPorRol[];
    metadata: Metadata;
}

export interface AccionesPorRol {
    id: number;
    nombre: string;
    descripcion: string;
    permisosDeAcceso: PermisosDeAcceso[];
    metadata: Metadata;
}

export interface PermisosDeAcceso {
    id: number;
    nombre: Nombre;
    descripcion: Descripcion;
    metadata: Metadata;
}

export enum Nombre {
    Crear = "crear",
    Eliminar = "eliminar",
    Leer = "leer",
    Modificar = "modificar"
}

export enum Descripcion {
    PermiteCrearRegistros = "Permite crear registros",
    PermiteEliminarRegistros = "Permite eliminar registros",
    PermiteLeerRegistros = "Permite leer registros",
    PermiteModificarRegistros = "Permite modificar registros"
}

export interface Metadata {
    fechaCreacion: string;
    fechaModificacion: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
} 