interface BackendResponse {
  nombre: string;
  persona: {
    nombre: string;
    apellido: string;
  };
  permiso: {
    organizacion: {
      nombre: string;
    };
  }[];
  userModulos: {
    modulos: ModuloBackend[];
  };
  tokens: {
    access_token: string;
  };
}

interface ModuloBackend {
  nombre: string;
  label: string;
  path: string;
  icon: string;
  acciones: { descripcion: string }[];
  children: ModuloBackend[];
}

interface FrontendData {
  userNombre: string;
  tokenUser: string;
  organizacion: string;
  sistema: string;
  activo: boolean;
  userModulos: FrontendModule[];
}

interface FrontendModule {
  label: string;
  items: FrontendModuleItem[];
}

interface FrontendModuleItem {
  label: string;
  icon: string;
  to: string;
  path: string;
  acciones: string[];
  element: string;
}

export const transformResponse = (backendData: BackendResponse): FrontendData => {
  const { persona, permiso, userModulos, tokens } = backendData;

  // 1. Construir el nombre completo del usuario
  const userNombre = `${persona.apellido} ${persona.nombre}`;

  // 2. Extraer la organización
  const organizacion = permiso.length > 0 ? permiso[0].organizacion.nombre : '';

  // 3. Construir los módulos para el frontend
  const transformModulos = (modulos: ModuloBackend[]): FrontendModuleItem[] => {
    return modulos.map(modulo => ({
      label: modulo.label,
      icon: modulo.icon,
      to: modulo.path,
      path: modulo.path,
      acciones: modulo.acciones.map(accion => accion.descripcion),
      element: modulo.nombre,
      ...(modulo.children.length > 0 ? { items: transformModulos(modulo.children) } : {})
    }));
  };

  const frontendModulos: FrontendModule[] = [
    {
      label: 'Sistema',
      items: transformModulos(userModulos.modulos)
    }
  ];

  // 4. Construir el objeto final
  const transformedData: FrontendData = {
    userNombre,
    tokenUser: tokens.access_token,
    organizacion,
    sistema: 'Facturación PROD',  // Ejemplo estático basado en la respuesta de backend
    activo: true, // Por defecto lo marcamos como activo
    userModulos: frontendModulos
  };

  return transformedData;
};