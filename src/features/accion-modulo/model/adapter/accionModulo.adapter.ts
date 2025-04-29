import { AccionModuloEntity } from '../entity/accionModulo.entity';
import { AccionModuloFormDTO, AccionModuloPostDTO, AccionModuloPatchDTO } from '../dtos/accionModulo.dto';

export interface AccionModuloAdapterOptions {
    isPatch?: boolean;
}

export const accionModuloToFormik = (rowData: any): AccionModuloFormDTO => {
    return {
        id: rowData?.id ?? 0,
        modulo: rowData?.modulo?.id ?? 0,
        accion: rowData?.accion?.id ? rowData.accion.id : []
    };
};

export const formikToAccionModulo = (values: AccionModuloFormDTO, rowData: AccionModuloEntity, options: AccionModuloAdapterOptions = {}): AccionModuloPostDTO | AccionModuloPatchDTO | AccionModuloPostDTO[] => {
    const { isPatch = false } = options;

    if (isPatch) {
        return {
            id: rowData?.id ?? 0,
            modulo: values.modulo,
            accion: values.accion[0] ?? 0
        };
    }

    // Para POST, devolvemos el objeto directamente
    return {
        modulo: values.modulo,
        accion: values.accion
    };
}; 