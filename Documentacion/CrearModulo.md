# Guía para Crear un Módulo Ejemplo TimeLine

## 1. Crear la Página y Configurar Rutas

### 1.1 Creación del Archivo de la Página
Primero, asegúrate de que el archivo para la página `TimeLine` ya existe en la carpeta apropiada:
```bash
src/pages/nosotros/TimeLine.tsx
```

### 1.2 Configuración de las Rutas
### Las rutas para TimeLine deben estar configuradas para usar carga diferida (lazy loading). Verifica y asegúrate de que esté en el archivo de rutas, típicamente algo como AppRouter.tsx:

```bash
import { lazy } from 'react';
const TimeLine = lazy(() => import('../pages/nosotros/TimeLine'));

const routes = {
  'TimeLine': TimeLine,
};
```
### 1.3 Estructura de carpetas
### La estructura de carpetas para el módulo feat dentro de features debe organizarse de la siguiente manera:
```bash
- features
  - feat
    - components
      - form
        - fieldValidations
          └── field.validations.ts
    - model
      - dtos
        └── feat.dto.ts
      - entity
        └── feat.entity.ts
    - service
      └── feat.service.ts
    - featView.tsx
```

## 2. DTOs y Entidades
### 2.1 Modelo DTO
### Para TimeLine, los objetos DTO están definidos para facilitar las operaciones de creación, actualización y eliminación.
```bash
#Snippet ->
createDtoBasic
```

```bash
// src/features/nosotros/time-line/model/dtos/timeLine.dto.ts
export interface TimeLinePostDTO {
  fecha: string;
  title: string;
  text: string;
  paginaId: number;
}

export type TimeLinePatchDTO = Partial<TimeLinePostDTO> & { id: number };

export interface TimeLineDeleteDTO {
  id: number;
}
```


### 2.2 Modelo Entity
### Las entidades representan la estructura de los datos tal como se esperan desde el backend.
```bash
#Snippet ->
createEntityBasic
```

```bash
// src/features/nosotros/time-line/model/entity/timeLine.entity.ts
import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface TimeLineResponse {
  data: TimeLineEntity[];
  metadata: MetadataEntity;
}

export interface TimeLineEntity {
  id: number;
  fecha: string;
  title: string;
  text: string;
  paginaId: number;
}
```


## 3. Servicios

### 3.1 URLs del Servicio
### Las URLs específicas para el módulo TimeLine gestionan las rutas API para las operaciones.
```bash
// src/features/nosotros/time-line/service/url/timeLine.url.ts
export const TimeLine = "/timeline";

export const TimeLineURL = {
  get: `${TimeLine}/search`,
  getById: `${TimeLine}/:id`,
  post: `${TimeLine}`,
  patch: `${TimeLine}/:id`,
  delete: `${TimeLine}/:id`
};
```

### 3.2 Servicio TimeLine
### El servicio maneja las interacciones con la API utilizando métodos CRUD estándar.
```bash
#Snippet ->
createBaseService
```
```bash
// src/features/nosotros/time-line/service/timeLine.service.ts
import { BaseService } from '../../../../service/BaseService';
import { TimeLineEntity } from '../model/entity/timeLine.entity';
import { TimeLineURL } from "./url/timeLine.url";

export class TimeLineService extends BaseService<TimeLineEntity> {
  constructor() {
    super(TimeLineURL);
  }
}

export const TimeLineApi = new TimeLineService();
```



### 3.3 Servicio TimeLine
### El servicio TimeLineService maneja las interacciones con la API utilizando métodos CRUD estándar, además de métodos personalizados para acciones específicas como búsqueda, creación, actualización y eliminación.
```bash 
import { Axios } from "@config/api/axios.config";
import { BaseService } from "../../../service/BaseService";
import { TimeLineEntity } from "../model/entity/timeLine.entity";
import { TimeLineURL } from "./url/timeLine.url";
import { cancelTokenSource } from '../../../config/api/axios.config';

const url = TimeLineURL;
export class TimeLineService extends BaseService<TimeLineEntity> {
    constructor() {
        super(TimeLineURL);

    }
    async getTimeLineSearch(): Promise<TimeLineEntity[]> {
        return await Axios.get(url.get, {  // Usando baseURL de la clase BaseService
            cancelToken: cancelTokenSource.token,
        });
    }

}

export const TimeLineApi = new TimeLineService();

```
### 3.4 Vista TimeLine Servicio Extendido
```bash
 const { data, isFetching, refetch } = useQueryApi<TimeLineEntity>(
    "TimeLine",
    TimeLineApi.getTimeLineSearch
  );
```

## 4. Vista del Componente
### 4.1 Configuración del Formulario y la Tabla
### Define los campos del formulario y las columnas de la tabla en el archivo de vista, utilizando componentes genéricos para CRUD.
```bash
#Snippet ->
createViewBasic
```
```bash
// src/features/nosotros/time-line/TimeLineView.tsx
import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";

const TimeLineView = () => {
  const formFields: FieldConfig[] = [
    { name: "title", type: "text", gridSize: "medium" },
    { name: "fecha", type: "text", gridSize: "medium" },
    { name: "text", type: "editor", gridSize: "full" },
    { name: "paginaId", type: "text", gridSize: "full", hidden: true, disabled: true }
  ];

  const columns: ICustomColumnItem[] = [
    { field: "title", header: "Titulo", sortable: true, filter: true, filterPlaceholder: "Buscar por titulo" },
    { field: "fecha", header: "Fecha", sortable: true, filter: true },
    { field: "text", header: "Texto", sortable: true, filter: true }
  ];

  return (
    <DynamicCrudPage
      moduleKey="timeLine"
      formFields={formFields}
      columns={columns}
    />
  );
};

export default TimeLineView;
```

## 5. Validaciones
### 5.1 Validaciones de Campo
### Utiliza Yup para definir reglas de validación que aseguren la integridad de los datos ingresados.
```bash
 #Snippet ->
createFieldValidations
```
```bash

import { stringValidation } from '@components/common/forms/validations/string.validations';
import * as Yup from 'yup';

export const fieldValidations = Yup.object().shape({
  title: stringValidation({
    isRequired: true,}),
  fecha: stringValidation({
    isRequired: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/,  // Simple date pattern YYYY-MM-DD
    message: { pattern: 'La fecha debe estar en formato YYYY-MM-DD' }
  }),
  text: stringValidation({
    isRequired: true,
    min: 10,
    max: 1000,
    trim: true
  }),
  paginaId: numberValidation({
    required: true,
    positive: true
  })
});
```


## 6. Validaciones
### 6.1 Labels
### Utiliza i18next para el manejo de labels en varios idiomas.
```bash
  timeLine: {
    labels: {
      title: "Título",
      date: "Fecha",
      description: "Descripción",
      actions: "Acciones"
    },
    actions: {
      add: "Agregar",
      edit: "Editar",
      delete: "Eliminar",
      view: "Ver"
    },
    messages: {
      addSuccess: "Elemento de línea de tiempo agregado exitosamente",
      editSuccess: "Elemento de línea de tiempo editado exitosamente",
      deleteSuccess: "Elemento de línea de tiempo eliminado exitosamente",
      deleteConfirm: "¿Estás seguro que deseas eliminar este elemento de línea de tiempo?",
      addError: "Error al agregar el elemento de línea de tiempo",
      editError: "Error al editar el elemento de línea de tiempo",
      deleteError: "Error al eliminar el elemento de línea de tiempo",
      fetchError: "Error al obtener los datos de línea de tiempo",
      serverError: "Error del servidor"
    },
    validation: {
      titleRequired: "El título es obligatorio",
      dateRequired: "La fecha es obligatoria",
      descriptionRequired: "La descripción es obligatoria"
    }
  }
```