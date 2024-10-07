interface JsonInput {
  id: number;
  nombre: string;
  email: string;
  password: string;
  persona: {
    id: number;
    cuil: string;
    nombre: string;
    apellido: string;
    genero: string;
  };
  permiso: Array<{
    id: number;
    sistema: {
      id: number;
      nombre: string;
      descripcion: string;
      url: string;
      clientId: string;
      clientSecret: string;
      icono: string;
    };
    organizacion: {
      id: number;
      nombre: string;
      bd: string;
      host: string;
      port: number;
      usuario: string;
      password: string;
      tipobd: string;
    };
    rol: {
      id: number;
      nombre: string;
      descripcion: string;
    };
  }>;
  userModulos: Array<{
    id: number;
    nombre: string;
    descripcion: string;
    label: string;
    element: string;
    icon: string;
    path: string;
    acciones: Array<{
      id: number;
      nombre: string;
      descripcion: string;
    }>;
  }>;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

interface TransformedJson {
  userNombre: string;
  tokenUser: string;
  organizacion: string;
  plan: string;
  sistema: string;
  activo: boolean;
  userModulos: Array<{
    label: string;
    items: Array<{
      label: string;
      icon: string;
      to: string;
      path: string;
      acciones: string[];
      element: string;
    }>;
  }>;
}
interface TransformedModulo {
  label: string;
  icon: string;
  to: string;
  path: string;  // Aseguramos que 'path' esté presente
  acciones: string[];
  element: string;
  items: TransformedModulo[];  // Los submódulos se representan de manera recursiva
}

export const transformJson = (input: JsonInput): TransformedJson => {
  const fullName = `${input.persona.apellido} ${input.persona.nombre}`;

  // Función auxiliar para mapear las acciones
  const mapAcciones = (acciones: Array<{ nombre: string }>) =>
    acciones.map((accion) => accion.nombre);
  const transformModulos = (modulos: any[]): TransformedModulo[] => {
    if (!Array.isArray(modulos)) {
      console.log("modulos no es un array:", modulos);  // <-- Añade esta línea para verificar si 'modulos' es un array
      return [];
    }

    return modulos.map((modulo): TransformedModulo => {
      const transformedModulo: TransformedModulo = {
        label: modulo.label,
        icon: modulo.icon,
        to: modulo.path || '',
        path: modulo.path || '',
        acciones: mapAcciones(modulo.acciones || []),
        element: modulo.element || '',
        items: []  // Inicialmente vacío, pero puede llenarse si hay children
      };

      // Si tiene hijos (children), los transformamos recursivamente
      if (modulo.children && modulo.children.length > 0) {
        transformedModulo.items = transformModulos(modulo.children);
      }

      return transformedModulo;
    });
  };
  const userModulosTransformed = transformModulos(input.userModulos);
  console.log("Módulos transformados:", userModulosTransformed); // Verifica la salida de los módulos transformados
  return {
    userNombre: fullName,
    tokenUser: input.tokens.access_token,
    organizacion: input.permiso[0]?.organizacion.nombre || "Desconocido",
    plan: "Basico",
    sistema: input.permiso[0]?.sistema.nombre || "Desconocido",
    activo: true,
    userModulos: userModulosTransformed,
  };
};


