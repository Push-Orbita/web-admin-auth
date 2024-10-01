import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface PermisosResponse {
    data: PermisosEntity[];
    metadata: MetadataEntity;
}

export interface PermisosEntity {
    id: number;
    usuario: Usuario;
    sistema: Sistema;
    organizacion: Organizacion;
    rol: Rol;
}

export interface Organizacion {
    id: number;
    nombre: string;
    bd: string;
    host: string;
    port: number;
    usuario: string;
    password: string;
    tipobd: string;
}

export interface Rol {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Sistema {
    id: number;
    nombre: string;
    descripcion: string;
    url: string;
    clientId: string;
    clientSecret: string;
    icono: string;
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
}
