import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface PermisosResponse {
    data: PermisosEntity[];
    metadata: MetadataEntity;
}

interface Persona {
    id: number;
    cuil: string;
    nombre: string;
    apellido: string;
    genero: string;
    usuarios: string[];
}

interface Accion {
    id: number;
    nombre: string;
    descripcion: string;
}

interface AccionPorModulo {
    id: number;
    modulo: string;
    accion: Accion;
    accionesPorRol: string[];
}

interface Modulo {
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
    accionesPorModulo: AccionPorModulo;
}

interface Plan {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
    suscripcion: string;
    contratos: {
        id: number;
        fechaVencimiento: string;
        plan: string;
        organizacion: {
            id: number;
            nombre: string;
        };
    }[];
    modulosPorPlan: {
        id: number;
        modulo: Modulo;
        plan: string;
    }[];
}

interface Suscripcion {
    id: number;
    nombre: string;
    descripcion: string;
    sistema: string;
    planes: Plan[];
    modulos: Modulo[];
}

interface Usuario {
    id: number;
    nombre: string;
    password: string;
    persona: Persona;
    permiso: string[];
    userModulos: any[];
    tokens: any;
}

interface Sistema {
    id: number;
    nombre: string;
    descripcion: string;
    url: string;
    icono: string;
    suscripciones: Suscripcion[];
    modulos: Modulo[];
    permisos: string[];
}

interface Organizacion {
    id: number;
    nombre: string;
}

interface Rol {
    id: number;
    nombre: string;
    descripcion: string;
    accionesPorRol: {
        id: number;
        rol: string;
        accionPorModulo: AccionPorModulo;
    }[];
    permisosDeAcceso: string[];
}

export interface PermisosEntity {
    id: number;
    usuario: Usuario;
    sistema: Sistema;
    organizacion: Organizacion;
    rol: Rol;
} 