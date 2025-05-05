import { ModuloEntity } from '@features/modulo/model/entity/modulo.entity';
import { TreeNode } from 'primereact/treenode';

export interface RolAdapterOptions {
    isPatch?: boolean;
}


// Usamos ModuloEntity en lugar de nuestra interfaz personalizada
export const adaptarModulosParaTreeSelect = (modulos: ModuloEntity[]): TreeNode[] => {
    // Primero, organizamos los módulos por sistema
    const modulosPorSistema = modulos.reduce((acc, modulo) => {
        // Si el módulo no tiene sistema, lo agrupamos en "Sin Sistema"
        const sistemaId = modulo.sistema?.id || 0;
        const sistemaNombre = modulo.sistema?.nombre || "Sin Sistema";
        const sistemaIcono = modulo.sistema?.icono || "pi pi-folder";

        if (!acc[sistemaId]) {
            acc[sistemaId] = {
                id: sistemaId,
                nombre: sistemaNombre,
                icon: sistemaIcono,
                modulos: []
            };
        }
        acc[sistemaId].modulos.push(modulo);
        return acc;
    }, {} as Record<number, { id: number; nombre: string; icon: string; modulos: ModuloEntity[] }>);

    // Convertimos a formato TreeNode
    return Object.values(modulosPorSistema).map(sistema => ({
        key: `sistema-${sistema.id}`,
        label: sistema.nombre,
        icon: sistema.icon,
        children: sistema.modulos.map(modulo => {
            // Verificamos si accionesPorModulo es un array
            const acciones = Array.isArray(modulo.accionesPorModulo)
                ? modulo.accionesPorModulo
                : modulo.accionesPorModulo
                    ? [modulo.accionesPorModulo]
                    : [];

            return {
                key: `modulo-${modulo.id}`,
                label: modulo.nombre,
                icon: modulo.icon || "pi pi-box",
                children: acciones.map(accion => ({
                    key: `accion-${accion.id}`,
                    label: accion.accion?.nombre || 'Acción sin nombre',
                    data: {
                        accionPorModulo: accion.id
                    }
                }))
            };
        })
    }));
};

export const rolToFormik = (rowData: any): any => {
    const accionesSeleccionadas = rowData?.accionesPorRol?.reduce((acc: any, ar: any) => {
        const id = ar.accionPorModulo?.id;
        if (id) {
            acc[`accion-${id}`] = { checked: true, partialChecked: false };
        }
        return acc;
    }, {} as Record<string, { checked: boolean; partialChecked: boolean }>);

    return {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        accionesPorRol: accionesSeleccionadas ?? {}
    };
};

export const formikToRol = (values: any): any | any => {
    // const { isPatch = false } = options;

    // Transformar las acciones seleccionadas del objeto a array de ids
    const accionesPorRol = Object.keys(values.accionesPorRol || {})
        .filter(key => key.startsWith("accion-") && values.accionesPorRol[key]?.checked)
        .map(key => {
            const id = parseInt(key.replace("accion-", ""));
            return { accionPorModulo: id };
        });

    const rolData = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        accionesPorRol
    };

    return rolData;
};