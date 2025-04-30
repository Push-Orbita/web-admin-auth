export interface CreatePlanDto {
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
    suscripcion: string;
    modulosPorPlan: {
        modulo: {
            id: number;
        };
    }[];
}

export interface UpdatePlanDto extends Partial<CreatePlanDto> {
    id: number;
}

export interface PlanResponseDto {
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
        modulo: {
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
            accionesPorModulo: {
                id: number;
                modulo: string;
                accion: {
                    id: number;
                    nombre: string;
                    descripcion: string;
                };
                accionesPorRol: string[];
            };
        };
        plan: string;
    }[];
}

export interface PlanPostDTO {
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
    suscripcion: number;
}

export type PlanPatchDTO = Partial<PlanPostDTO> & { id: number };

export interface PlanDeleteDTO {
    id: number;
} 