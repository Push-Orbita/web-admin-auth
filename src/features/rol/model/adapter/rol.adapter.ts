import { RolEntity } from '../entity/rol.entity';
import { CreateRolDto, UpdateRolDto } from '../dtos/rol.dto';
import { TreeNode } from 'primereact/treenode';
import { ModuloEntity } from '@features/modulo/model/entity/modulo.entity';

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

export const rolToFormik = (rowData: RolEntity): any => {
    return {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        accionesPorRol: rowData?.accionesPorRol?.map(ar => ar.accionPorModulo) ?? []
    };
};

export const formikToRol = (values: any, options: RolAdapterOptions = {}): CreateRolDto | UpdateRolDto => {
    const { isPatch = false } = options;

    const rolData = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        accionesPorRol: values.accionesPorRol.map((id: number) => ({
            accionPorModulo: id
        }))
    };

    if (isPatch) {
        return rolData;
    }

    return rolData;
};