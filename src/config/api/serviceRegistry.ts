import { SistemasEntity } from "@features/sistemas/model/entity/sistema.entity";
import { SistemasApi, SistemasService } from "@features/sistemas/service/sistemas.service";


// Definir los servicios (el mapa indica el tipo de cada servicio)
interface ServiceMap {
    sistemas: SistemasService,
}

// Registro de servicios (instancias reales)
const serviceRegistry: ServiceMap = {
    sistemas: SistemasApi,
};

// Definir los posibles módulos
export type ModuleKey = keyof ServiceMap;

interface EntityMap {
    sistemas: SistemasEntity,
}

export type ModuleEntity<M extends ModuleKey> = EntityMap[M];

export const getServiceApi = <M extends ModuleKey>(moduleKey: M): ServiceMap[M] => {
    return serviceRegistry[moduleKey];
};
