# Documentación de Configuración de Campos de Formulario
## Introducción
### Esta guía proporciona detalles sobre cómo configurar y utilizar los campos de formulario en el sistema de formularios dinámicos. Cada tipo de campo tiene opciones específicas que pueden ser configuradas para ajustarse a las necesidades del formulario.

## Configuración de Campos
## Estructura General del Campo
```bash
interface FieldConfig {
    name: string;
    label?: string;
    type: "number" | "text" | "email" | "password" | "date" | "select" | "multiselect" | "editor" | "autocomplete" | "checkbox" | "upload" | "upload-array" | "array" | "icon-select";
    fields?: FieldConfig[];
    selectKey?: string;
    optionLabel?: string;
    options?: any[];
    placeholder?: string;
    disabled?: boolean | ((rowData?: any) => boolean);
    rowData?: any;
    gridSize?: "full" | "medium" | "quarter";
    hidden?: boolean;
    defaultValue?: string | number | boolean | [] | {};
    uppercase?: boolean;
    pascalCase?: boolean;
    capitalize?: boolean;
}

```

## Descripción de Propiedades

- **name**: Nombre del campo, que se usa como clave en el formulario.
- **label**: Etiqueta del campo que se muestra en la UI.
- **type**: Tipo de campo, define cómo se debe renderizar el campo.
- **fields**: Subcampos, utilizado para campos de tipo `array`.
- **selectKey**: Clave utilizada para cargar opciones de selección dinámicamente.
- **optionLabel**: Etiqueta de las opciones en campos de selección.
- **options**: Opciones estáticas para campos de selección.
- **placeholder**: Texto de marcador de posición en el campo.
- **disabled**: Indica si el campo está deshabilitado.
- **rowData**: Datos adicionales asociados con el campo.
- **gridSize**: Define el tamaño del campo en la grilla.
- **hidden**: Si el campo debe estar oculto.
- **defaultValue**: Valor predeterminado del campo.
- **uppercase**: Si el texto debe estar en mayúsculas.
- **pascalCase**: Si el texto debe estar en PascalCase.
- **capitalize**: Si el texto debe estar capitalizado.


## Ejemplos de Uso
## Campo de Texto Básico

```bash
{
    name: "email",
    type: "text",
    gridSize: "full",
    placeholder: "Ingrese su email"
}

```

## Selección Múltiple con Opciones Dinámicas

```bash
{
    name: "categories",
    type: "multiselect",
    selectKey: "categories",
    optionLabel: "name",
    gridSize: "full"
}
```

## Campo de Fecha
```bash
{
    name: "start_date",
    type: "date",
    gridSize: "medium",
    placeholder: "Seleccione una fecha"
}
```
## Configuración de Campo Tipo Select
### Este es un campo select que permite a los usuarios seleccionar una opción de una lista de categorías. Las opciones para este campo son cargadas dinámicamente usando una clave específica.
```bash
{
    name: "categoria",
    type: "select",
    gridSize: "medium",
    selectKey: "categoriaTypeOption",  // Clave para cargar las opciones dinámicamente
    optionLabel: "nombre"  // Atributo de los objetos de opciones que se muestra en la interfaz de usuario
}
```
## Descripción de la Configuración
- name: "categoria" - Este es el nombre del campo en el formulario. Se utiliza para identificar el campo en el estado del formulario y cuando se recogen los datos del formulario.

- type: "select" - Indica que el campo es un campo de selección, permitiendo al usuario elegir de una lista desplegable.

- selectKey: "categoriaTypeOption" - Esta es una clave que se utiliza para cargar las opciones para el campo de selección dinámicamente. Dependiendo de la implementación, esta clave se asocia con una función o un método que recupera las opciones de una fuente de datos, como una base de datos o una API externa.

- optionLabel: "nombre" - Especifica el atributo de los objetos dentro de las opciones que se usará para mostrar la etiqueta en la interfaz de usuario. En este caso, cada opción en el campo de selección mostrará el valor del atributo "nombre" de sus objetos de opción correspondientes.


## Paso a Paso para Agregar un Módulo a selectEntitiesConfig
- Importar la API del Servicio: Asegúrate de importar correctamente la API del servicio que utilizarás para obtener las opciones. En este caso, ya has importado CategoriaTypeApi, que se usará para obtener las categorías.

- Agregar la Configuración al Objeto selectEntitiesConfig:

- Define una nueva entrada en el objeto selectEntitiesConfig para el nuevo tipo de selección que deseas configurar.

- Asigna el método apropiado de la API al campo apiService. Este método debería retornar las opciones que necesitas cargar en el select.

- Especifica qué campo de los objetos obtenidos será usado como la etiqueta visible (labelField) y cuál como el valor (valueField).

- Usar la Configuración en el Formulario:

Asegúrate de que el campo de formulario que utilizará esta configuración está correctamente configurado con el selectKey que corresponde a la nueva configuración.

## Ejemplo Completo
### Suponiendo que quieres agregar una configuración para un módulo que maneja tipos de categorías, aquí tienes cómo podría lucir el código ajustado:

```bash
Editar
import { CategoriaTypeApi } from "@features/categoria-type/service/categoriaType.service";
import { TagTypeApi } from "@features/tag-type/service/tagType.service";

interface SelectEntityConfig {
    apiService: () => Promise<any>; // API que devuelve las opciones
    labelField: string; // Campo que se usará como label en el select
    valueField: string; // Campo que se usará como value en el select
}

const selectEntitiesConfig: Record<string, SelectEntityConfig> = {
    categoriaTypeOption: {
        apiService: CategoriaTypeApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    tagTypeOption: {
        apiService: TagTypeApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    // Puedes continuar agregando más configuraciones aquí si es necesario
};

export default selectEntitiesConfig;
```

## Ejemplo de Configuración de Campo Tipo Array
### Supongamos que deseas crear un campo en un formulario que permita a los usuarios ingresar múltiples instancias de datos relacionados con experiencias laborales. Cada "experiencia laboral" podría tener subcampos para el nombre de la empresa, el rol desempeñado, y las fechas de inicio y fin.

```bash
const formFields: FieldConfig[] = [
  {
    name: "experiencias",
    label: "Experiencias Laborales",
    type: "array",
    gridSize: "full",
    fields: [
      {
        name: "empresa",
        label: "Empresa",
        type: "text",
        gridSize: "full",
        placeholder: "Nombre de la empresa",
        capitalize: true
      },
      {
        name: "rol",
        label: "Rol Desempeñado",
        type: "text",
        gridSize: "full",
        placeholder: "Ej: Desarrollador de Software",
        capitalize: true
      },
      {
        name: "fechaInicio",
        label: "Fecha de Inicio",
        type: "date",
        gridSize: "medium",
        placeholder: "Fecha de inicio"
      },
      {
        name: "fechaFin",
        label: "Fecha de Fin",
        type: "date",
        gridSize: "medium",
        placeholder: "Fecha de fin",
        disabled: (rowData) => rowData && rowData.fechaInicio && new Date(rowData.fechaInicio) >= new Date()
      }
    ]
  }
];
```

## Explicación del Ejemplo
- Experiencias: Este es el campo de tipo array que permite a los usuarios añadir múltiples bloques de información sobre sus experiencias laborales.

- Empresa, rol, fechaInicio, fechaFin: Estos son los subcampos dentro del campo de tipo array. Cada uno de estos subcampos tiene su propia configuración como tipo de campo, etiqueta, tamaño en la grilla, y otras opciones específicas como placeholder y capitalize.

- Disabled para fechaFin: Un ejemplo de cómo puedes utilizar funciones para dinámicamente habilitar o deshabilitar un campo basado en los datos de otros campos. En este caso, fechaFin está deshabilitado si la fechaInicio es una fecha futura.

Este enfoque te permite configurar formularios complejos donde los usuarios necesitan ingresar listas de elementos con múltiples atributos, cada uno con su propio conjunto de restricciones y configuraciones. Este tipo de configuración es muy útil en formularios dinámicos para manejar datos estructurados de manera flexible y robusta.
## Personalización y Extensiones
Se puede personalizar el comportamiento de los campos utilizando las propiedades **uppercase**, **capitalize**, y **pascalCase** para ajustar la presentación del texto según sea necesario. Además, el uso de hidden y defaultValue permite controlar la visibilidad y el estado inicial de los campos.
