import { accionModuloToFormik, formikToAccionModulo } from "@features/accion-modulo/model/adapter/accionModulo.adapter";
import { formikToModulo, moduloToFormik, ModuloAdapterOptions } from "@features/modulo/model/adapter/modulo.adapter";
import { permisosToTable } from "@features/permisos/model/adapter/permisos.adapter";
import { formikToPlan, planToFormik } from "@features/plan/model/adapter/plan.adapter";

export interface EntityAdapter {
    toFormik: (data: any) => any;
    toApi: (data: any, options?: { isPatch?: boolean }) => any;
    toTable?: (data: any[]) => any[];
}

const entityAdapters = {
    modulo: {
        toFormik: moduloToFormik,
        toApi: (data: any, options?: ModuloAdapterOptions) => formikToModulo(data, options)
    },
    accionModulo: {
        toFormik: accionModuloToFormik,
        toApi: formikToAccionModulo,
    },
    permisos: {
        toTable: permisosToTable
    },
    plan: {
        toFormik: planToFormik,
        toApi: formikToPlan
    }
};

export type ModuleKey = keyof typeof entityAdapters;
export const getEntityAdapter = (moduleKey: string) => {
    const defaultAdapter = {
        toFormik: (data: any) => data,
        toApi: (data: any) => data,
        toTable: (input: any) => {
            const normalized = Array.isArray(input)
                ? input
                : Array.isArray(input?.data)
                    ? input.data
                    : input
                        ? [input]
                        : [];

            return {
                data: normalized,
                metadata: {
                    count: normalized.length,
                    pageNumber: 1,
                    pageSize: normalized.length,
                    totalPages: 1,
                },
            };
        },
    };

    return {
        ...defaultAdapter,
        ...(entityAdapters[moduleKey as ModuleKey] as Record<string, any> ?? {}),
    };
};