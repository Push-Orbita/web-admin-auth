import { CategoriaTypeEntity } from "@features/categoria-type/model/entity/categoriaType.entity";
import { CategoriaTypeApi, CategoriaTypeService } from "@features/categoria-type/service/categoriaType.service";
import { SeccionComentariosApi, SeccionComentariosService } from "@features/inicio/seccion-comentarios/service/seccionMarca.service";
import { SeccionDestacadaEntity } from "@features/inicio/seccion-destacada/model/entity/seccion-destacada.entity";
import { SeccionDestacadaApi, SeccionDestacadaService } from "@features/inicio/seccion-destacada/service/seccion-destacada.service";
import { SeccionMarcaEntity } from "@features/inicio/seccion-marca/model/entity/seccionMarca.entity";
import { SeccionMarcaApi, SeccionMarcaService } from "@features/inicio/seccion-marca/service/seccionMarca.service";
import { NoticiaEntity } from "@features/noticia/model/entity/noticia.entity";
import { NoticiaApi, NoticiaService } from "@features/noticia/service/noticia.service";
import { TagTypeEntity } from "@features/tag-type/model/entity/tagType.entity";
import { TagTypeApi, TagTypeService } from '@features/tag-type/service/tagType.service';
import { SeccionComentariosEntity } from '../../features/inicio/seccion-comentarios/model/entity/seccionComentarios.entity';
import { SeccionNormasApi, SeccionNormasService } from "@features/inicio/seccion-normas/service/seccionNormas.service";
import { SeccionNormasEntity } from "@features/inicio/seccion-normas/model/entity/seccionNormas.entity";
import { MisionVisionApi, MisionVisionService } from "@features/nosotros/mision-vision/service/misionVision.service";
import { MisionVisionEntity } from "@features/nosotros/mision-vision/model/entity/misionVision.entity";
import { ProcesoApi, ProcesoService } from "@features/nosotros/proceso/service/proceso.service";
import { ProcesoEntity } from "@features/nosotros/proceso/model/entity/proceso.entity";
import { ContactoApi, ContactoService } from "@features/contacto/service/contacto.service";
import { ContactoEntity } from "@features/contacto/model/entity/contacto.entity";
import { HeroPageInversionesService } from "@features/inversiones/hero-page-inversiones/service/heroPageInversiones.service";
import { HeroPageInversionesApi } from '../../features/inversiones/hero-page-inversiones/service/heroPageInversiones.service';
import { HeroPageInversionesEntity } from "@features/inversiones/hero-page-inversiones/model/entity/heroPageInversiones.entity";
import { InversionesApi, InversionesService } from "@features/inversiones/inversiones/service/inversiones.service";
import { InversionesEntity } from "@features/inversiones/inversiones/model/entity/inversiones.entity";
import { ProductoApi, ProductoService } from "@features/producto/productos/service/producto.service";
import { productoEntity } from "@features/producto/productos/model/entity/producto.entity";

// Definir los servicios (el mapa indica el tipo de cada servicio)
interface ServiceMap {
    categoriaType: CategoriaTypeService;
    tagType: TagTypeService;
    seccionDestacada: SeccionDestacadaService;
    noticia: NoticiaService;
    seccionMarca: SeccionMarcaService;
    seccionComentarios: SeccionComentariosService;
    seccionNormas: SeccionNormasService;
    misionVision: MisionVisionService;
    proceso: ProcesoService;
    contacto: ContactoService;
    heroPageInversiones: HeroPageInversionesService;
    inversiones: InversionesService;
    producto: ProductoService;
}

// Registro de servicios (instancias reales)
const serviceRegistry: ServiceMap = {
    categoriaType: CategoriaTypeApi,
    tagType: TagTypeApi,
    seccionDestacada: SeccionDestacadaApi,
    noticia: NoticiaApi,
    seccionMarca: SeccionMarcaApi,
    seccionComentarios: SeccionComentariosApi,
    seccionNormas: SeccionNormasApi,
    misionVision: MisionVisionApi,
    proceso: ProcesoApi,
    contacto: ContactoApi,
    heroPageInversiones: HeroPageInversionesApi,
    inversiones: InversionesApi,
    producto: ProductoApi,
};

// Definir los posibles módulos
export type ModuleKey = keyof ServiceMap;

interface EntityMap {
    categoriaType: CategoriaTypeEntity;
    tagType: TagTypeEntity;
    seccionDestacada: SeccionDestacadaEntity;
    noticia: NoticiaEntity;
    seccionMarca: SeccionMarcaEntity;
    seccionComentarios: SeccionComentariosEntity;
    seccionNormas: SeccionNormasEntity;
    misionVision: MisionVisionEntity;
    proceso: ProcesoEntity;
    contacto: ContactoEntity;
    heroPageInversiones: HeroPageInversionesEntity;
    inversiones: InversionesEntity;
    producto: productoEntity;
}

export type ModuleEntity<M extends ModuleKey> = EntityMap[M];

export const getServiceApi = <M extends ModuleKey>(moduleKey: M): ServiceMap[M] => {
    return serviceRegistry[moduleKey];
};
