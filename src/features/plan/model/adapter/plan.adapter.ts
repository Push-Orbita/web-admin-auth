import { PlanEntity } from '../entity/plan.entity';
import { CreatePlanDto, UpdatePlanDto } from '../dtos/plan.dto';

export interface PlanAdapterOptions {
    isPatch?: boolean;
}

export const planToFormik = (rowData: PlanEntity): any => {
    return {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        duracion: rowData?.duracion ?? 0,
        precio: rowData?.precio ?? 0,
        suscripcion: rowData?.suscripcion?.id ?? 0,
        modulosPorPlan: rowData?.modulosPorPlan?.map(mp => mp.modulo.id) ?? []
    };
};

export const formikToPlan = (values: any, options: PlanAdapterOptions = {}): CreatePlanDto | UpdatePlanDto => {
    const { isPatch = false } = options;

    const planData = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        duracion: Number(values.duracion),
        precio: Number(values.precio),
        suscripcion: Number(values.suscripcion),
        modulosPorPlan: values.modulosPorPlan.map((id: number) => ({
            modulo: id
        }))
    };

    if (isPatch) {
        return planData;
    }

    return planData;
}; 