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
  
  export const transformJson = (input: JsonInput): TransformedJson => {
    const fullName = `${input.persona.apellido} ${input.persona.nombre}`;
    const accionesMap = (acciones: Array<{ descripcion: string }>) => 
      acciones.map((accion) => accion.descripcion);
  
    const userModulosTransformed = input.userModulos.map((modulo) => ({
      label: modulo.label,
      items: [
        {
          label: modulo.label,
          icon: modulo.icon,
          to: modulo.path,
          path: modulo.path,
          acciones: accionesMap(modulo.acciones),
          element: modulo.element,
        },
      ],
    }));
  
    return {
      userNombre: fullName,
      tokenUser: input.tokens.access_token,
      organizacion: input.permiso[0]?.organizacion.nombre || "Desconocido",
      plan: "Basico", // Suponiendo que el plan es fijo o puede derivarse de otra fuente.
      sistema: input.permiso[0]?.sistema.nombre || "Desconocido",
      activo: true,
      userModulos: userModulosTransformed,
    };
  };

  