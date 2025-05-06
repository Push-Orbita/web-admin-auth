import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface PlanResponse {
    data: PlanEntity[];
    metadata: MetadataEntity;
}

export interface PlanEntity {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
    suscripcion: number;
}

export interface Plan {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
    suscripcion: string;
    contratos: Contrato[];
    modulosPorPlan: ModuloPorPlan[];
}

export interface Contrato {
    id: number;
    fechaVencimiento: string;
    plan: string;
    organizacion: Organizacion;
}

export interface Organizacion {
    id: number;
    nombre: string;
}

export interface ModuloPorPlan {
    id: number;
    modulo: Modulo;
    plan: string;
}

export interface Modulo {
    id: number;
    nombre: string;
    descripcion: string;
    label: string;
    element: string;
    icon: string;
    path: string;
    moduloPadre: string;
    sistema: string;
    suscripcion: string;
    accionesPorModulo: AccionesPorModulo;
}

export interface AccionesPorModulo {
    id: number;
    modulo: string;
    accion: Accion;
    accionesPorRol: string[];
}

export interface Accion {
    id: number;
    nombre: string;
    descripcion: string;
} 