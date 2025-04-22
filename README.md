# Web Admin Template (React + TypeScript + Vite)

🚀 **Administrador de Contenidos** desarrollado con **React 18+, TypeScript y Vite**.  
Este proyecto está diseñado para ser modular, escalable y eficiente, utilizando tecnologías modernas como **Redux Toolkit, React Query, Formik, Yup, PrimeReact y más**.

---

## Tecnologías Utilizadas

- ⚛ **React 18+** (Librería de UI)
- 🚀 **Vite** (Empaquetador rápido)
- 🏗 **TypeScript** (Tipado estático)
- 📦 **Redux Toolkit** (Gestión de estado global)
- 🔄 **React Query** (Manejo de datos asíncronos)
- 🎨 **PrimeReact + PrimeFlex** (Componentes UI y CSS utilitario)
- 📡 **Axios** (Peticiones HTTP con interceptors)
- 📋 **Formik + Yup** (Manejo de formularios y validaciones)
- 🌍 **React i18next** (Internacionalización)
- ✅ **ESLint + Prettier** (Linting y formateo de código)

---

## Estructura del Proyecto

```plaintext
src/
  ├── assets/            # Imágenes, iconos, estilos
  ├── components/        # Componentes reutilizables (Botones, Modales, Formularios)
  ├── config/            # Configuración de API, constantes y settings
  ├── features/          # Módulos principales (Usuarios, Categorías, Noticias, etc.)
  ├── hooks/             # Hooks personalizados (useSelectOptions, useDebounce, etc.)
  ├── layout/            # Componentes de estructura (Sidebar, Header, Footer)
  ├── pages/             # Páginas de la aplicación (Home, Login, Dashboard, etc.)
  ├── redux/             # Gestión de estado con Redux Toolkit
  ├── router/            # Rutas de la aplicación (Públicas y Privadas)
  ├── service/           # Servicios de API
  ├── ui/                # Estilos y temas personalizados
  ├── utilities/         # Funciones auxiliares (formatos, validaciones, etc.)
  ├── App.tsx            # Componente raíz de la aplicación
  ├── main.tsx           # Punto de entrada principal
```

# 📌 Configuración y Ejecución

## 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/tu-repositorio/web-admin-template.git
cd web-admin-template
```

# 2️⃣ Instalar Dependencias

```bash
npm install

# o

yarn install
```

# 3️⃣ Configurar Variables de Entorno

```bash
VITE_APP_API_URL=https://api.tu-servidor.com
VITE_APP_API_URL_AUTH=https://api.tu-servidor.com/auth
```

# 4️⃣ Ejecutar el Proyecto en Modo Desarrollo

```bash
npm run dev
# o
yarn dev

```

# 5️⃣ Construir para Producción

```bash
npm run build
# o
yarn build
```

# 6️⃣ Previsualizar la Aplicación en Producción

```bash
npm run preview
```

## 🌍 Rutas Principales

| Ruta           | Descripción                | Acceso  |
| -------------- | -------------------------- | ------- |
| `/home`        | Página de inicio           | Pública |
| `/auth/login`  | Página de inicio de sesión | Pública |
| `/dashboard`   | Panel de administración    | Privada |
| `/usuarios`    | Gestión de usuarios        | Privada |
| `/productos`   | Gestión de productos       | Privada |
| `/facturacion` | Módulo de facturación      | Privada |

# 🎨 Configuración de ESLint y Prettier

```bash
npm run lint  # Verifica errores de linting
npm run format  # Aplica Prettier a todo el código
```

# 🔑 Autenticación y Autorización

🛠 Manejador de Tokens
El token de usuario se almacena en localStorage y se incluye automáticamente en cada petición API gracias a los interceptores de Axios.

```bash
export const authorize = async (access_token: string) => {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    AuthAxios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
};
```

# 🔒 Protección de Rutas con PrivateRoutes.tsx

```bash
const PrivateRoutes = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};
```

# 📡 Manejo de API con Axios y React Query

✨ Interceptors Globales en axios.config.ts

```bash
Axios.interceptors.response.use(
  response => response,
  error => {
    toast.error(error.response?.data?.message || "Error en la API");
    return Promise.reject(error);
  }
);

```

# 🚀 Uso de useQueryApi para Fetching Automático

```bash
const { data, isLoading } = useQueryApi("usuarios", UsuarioApi.getAll);
```

# 🎯 Hook useSelectOptions para Selects Dinámicos

```bash
const { options, isLoading } = useSelectOptions("categoriaType");

```

# 🎨 Temas y Estilos

📌 Uso de PrimeReact y PrimeFlex
Se usa PrimeReact para componentes interactivos (modales, formularios, tablas).
Se usa PrimeFlex para diseño de grillas y responsividad.
🎨 Cambio de Temas en App.tsx

```bash
const isDarkTheme = useSelector((state: RootState) => state.ui.theme);

useEffect(() => {
    document.getElementById("theme-link")!.href = isDarkTheme
        ? "/themes/arya-blue/theme.css"
        : "/themes/fluent-light/theme.css";
}, [isDarkTheme]);

```
