import * as React from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { ReactNode } from 'react';
import { useAppSelector } from './reduxHook';

interface PermisosProviderProps {
  children: ReactNode;
}
// Definir la forma de los permisos
interface Permisos {
  puedeAgregar: boolean;
  puedeBorrar: boolean;
  puedeModificar: boolean;
  puedeVer: boolean;
  puedeDetalle: boolean;
  puedeReporte: boolean;
  puedeVerCredenciales: boolean;
  puedeEditarCredenciales: boolean;
}

// Crear el contexto con un estado por defecto
const PermisosContext = createContext<Permisos>({
  puedeAgregar: false,
  puedeBorrar: false,
  puedeModificar: false,
  puedeVer: false,
  puedeDetalle: false,
  puedeReporte: false,
  puedeVerCredenciales: false,
  puedeEditarCredenciales: false,
});

// Hook personalizado para usar el contexto de permisos
export const usePermisos = () => useContext(PermisosContext);

// Componente proveedor que englobará partes de tu aplicación
export const PermisosProvider: React.FC<PermisosProviderProps> = ({ children }) => {
  const { userModulos } = useAppSelector(
    (state) => state.auth
  );
  const { pathname } = useLocation();
  const [permisos, setPermisos] = useState<Permisos>({
    puedeAgregar: false,
    puedeBorrar: false,
    puedeModificar: false,
    puedeVer: false,
    puedeDetalle: false,
    puedeReporte: false,
    puedeVerCredenciales: false,
    puedeEditarCredenciales: false,
  });

  const verificarAcciones = useCallback((items: any[], path: string): Permisos | null => {
    if (!items || items.length === 0) return null;

    for (const item of items) {
      if (item.path === path && item.acciones) {
        return {
          puedeAgregar: item.acciones.includes('A'),
          puedeBorrar: item.acciones.includes('B'),
          puedeModificar: item.acciones.includes('M'),
          puedeVer: item.acciones.includes('V'),
          puedeDetalle: item.acciones.includes('D'),
          puedeReporte: item.acciones.includes('R'),
          puedeVerCredenciales: item.acciones.includes('VC'),
          puedeEditarCredenciales: item.acciones.includes('EC'),
        };
      }
      // Si el item tiene sub-items, continuamos la búsqueda de manera recursiva
      if (item.items && item.items.length > 0) {
        const accionesEncontradas: Permisos | null = verificarAcciones(item.items, path);
        if (accionesEncontradas) return accionesEncontradas;
      }
    }
    // Si no se encuentra nada, se retorna null
    return null;
  }, []);

  useEffect(() => {
    // Solo actualizamos los permisos si hay userModulos y una ruta válida
    if (userModulos && userModulos.length > 0 && pathname) {
      const acciones = verificarAcciones(userModulos, pathname);
      if (acciones) {
        // Verificamos si realmente hay cambios antes de actualizar el estado
        const permisosHanCambiado = Object.keys(acciones).some(
          (key: string) => acciones[key as keyof Permisos] !== permisos[key as keyof Permisos]
        );

        if (permisosHanCambiado) {
          setPermisos(acciones);
        }
      }
    }
  }, [pathname, userModulos, verificarAcciones, permisos]);

  // Memorizamos el valor del contexto para evitar renderizaciones innecesarias
  const contextValue = useMemo(() => permisos, [permisos]);

  return (
    <PermisosContext.Provider value={contextValue}>
      {children}
    </PermisosContext.Provider>
  );
};