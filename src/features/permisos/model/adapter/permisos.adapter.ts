export interface PermisoData {
    id: number;
    usuario: {
        id: number;
        nombre: string;
        email: string;
    };
    sistema: {
        id: number;
        nombre: string;
        descripcion: string;
        url: string;
        icono: string;
    };
    organizacion: {
        id: number;
        nombre: string;
    };
    rol: {
        id: number;
        nombre: string;
        descripcion: string;
    };
}

export interface PermisoAgrupado {
    id: number;
    nombre: string;
    email: string;
    permisos: {
        sistema: {
            id: number;
            nombre: string;
            descripcion: string;
            url: string;
            icono: string;
        };
        organizacion: {
            id: number;
            nombre: string;
        };
        rol: {
            id: number;
            nombre: string;
            descripcion: string;
        };
    }[];
}

export interface TableResponse {
    data: PermisoData[];
    metadata: {
        count: number;
        pageNumber: number;
        pageSize: number;
        totalPages: number;
    };
}

export const permisosToTable = (data: TableResponse) => {
    if (!data?.data) {
        return {
            data: [],
            metadata: {
                count: 0,
                pageNumber: 1,
                pageSize: 10,
                totalPages: 1
            }
        };
    }

    // Agrupar permisos por usuario
    const permisosAgrupados = data.data.reduce((acc: { [key: string]: PermisoAgrupado }, permiso) => {
        const usuarioId = permiso.usuario.id.toString();

        if (!acc[usuarioId]) {
            acc[usuarioId] = {
                id: permiso.usuario.id,
                nombre: permiso.usuario.nombre,
                email: permiso.usuario.email,
                permisos: []
            };
        }

        acc[usuarioId].permisos.push({
            sistema: permiso.sistema,
            organizacion: permiso.organizacion,
            rol: permiso.rol
        });

        return acc;
    }, {});

    // Convertir el objeto agrupado a un array
    const dataAgrupada = Object.values(permisosAgrupados);

    return {
        data: dataAgrupada,
        metadata: data.metadata
    };
}; 