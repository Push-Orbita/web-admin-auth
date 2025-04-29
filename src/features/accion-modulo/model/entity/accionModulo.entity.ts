import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface AccionModuloResponse {
    data: AccionModuloEntity[];
    metadata: MetadataEntity;
}

export interface AccionModuloEntity {
    id: number;
    modulo: {
        id: number;
        nombre: string;
        descripcion: string;
        label: string;
        element: string;
        icon: string;
        path: string;
        moduloPadre: string;
        sistema: {
            id: number;
            nombre: string;
            descripcion: string;
            url: string;
            icono: string;
        };
        suscripcion: {
            id: number;
            nombre: string;
            descripcion: string;
            sistema: string;
        };
        accionesPorModulo: string;
    };
    accion: {
        id: number;
        nombre: string;
        descripcion: string;
    };
    accionesPorRol: Array<{
        id: number;
        rol: {
            id: number;
            nombre: string;
            descripcion: string;
        };
        accionPorModulo: string;
    }>;
} 