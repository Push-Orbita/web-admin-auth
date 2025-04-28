import { ModuloEntity } from '../entity/modulo.entity';
import { ModuloDTO, ModuloPostDTO, ModuloData } from '../dtos/modulo.dto';

export interface ModuloAdapterOptions {
    isArrayResponse?: boolean;
    isPatch?: boolean;
}

export const moduloToFormik = (rowData: ModuloEntity | ModuloEntity[]): ModuloDTO => {
    const modulo = Array.isArray(rowData) ? rowData[0] : rowData;
    return {
        nombre: modulo?.nombre ?? "",
        descripcion: modulo?.descripcion ?? "",
        label: modulo?.label ?? "",
        element: modulo?.element ?? "",
        icon: modulo?.icon ?? "",
        path: modulo?.path ?? "",
        moduloPadre: typeof modulo?.moduloPadre === 'object' && modulo.moduloPadre !== null
            ? (modulo.moduloPadre as { id: number }).id
            : null,
        sistema: modulo?.sistema?.id ?? 0,
        accionesPorModulo: Array.isArray(modulo?.accionesPorModulo)
            ? modulo.accionesPorModulo.map(accion => accion.accion.id)
            : modulo?.accionesPorModulo?.accion?.id
                ? [modulo.accionesPorModulo.accion.id]
                : []
    };
};

export const formikToModulo = (values: ModuloDTO, options: ModuloAdapterOptions = {}): ModuloPostDTO => {
    const { isArrayResponse = true, isPatch = false } = options;
    const moduloData: ModuloData = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        label: values.label,
        element: values.element,
        icon: values.icon,
        path: values.path,
        moduloPadre: values.moduloPadre,
        sistema: values.sistema,
        accionesPorModulo: isPatch
            ? values.accionesPorModulo.map(id => ({ modulo: values.moduloPadre || 0, accion: id }))
            : values.accionesPorModulo.map(id => ({ accion: id }))
    };

    if (isPatch) {
        return moduloData;
    }

    return isArrayResponse ? [moduloData] : moduloData;
}; 