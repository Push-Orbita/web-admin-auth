import axios from "axios"
import { toast } from "react-hot-toast"
import { store } from "@redux/store/store"
import { clearTokens, LogOut } from "@redux/slices/auth/autSlice"

export const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
})

export const AuthAxios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL_AUTH}`,
})
export const cancelTokenSource = axios.CancelToken.source()
export const authorize = async (access_token: string) => {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + access_token
    AuthAxios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token
    return { Axios, AuthAxios }
}

// Interceptor para agregar el token a las peticiones
Axios.interceptors.request.use(
    (config) => {
        const state = store.getState()
        const token = state.auth.tokenUser

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor para manejar errores y refrescar tokens
Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Si el error es 401 y no es una petición de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Aquí puedes implementar la lógica de refresh token si lo necesitas
                // Por ahora, simplemente cerramos la sesión
                store.dispatch(clearTokens())
                store.dispatch(LogOut())
                toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.")
                window.location.href = '/login'
            } catch (refreshError) {
                store.dispatch(clearTokens())
                store.dispatch(LogOut())
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

// Interceptor para manejar errores en AuthAxios
AuthAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response

            // Manejo de errores comunes
            switch (status) {
                case 401:
                    toast.error("No autorizado. Por favor, inicia sesión.")
                    store.dispatch(clearTokens())
                    store.dispatch(LogOut())
                    window.location.href = '/login'
                    break
                case 403:
                    toast.error("Acceso denegado.")
                    break
                case 404:
                    toast.error("Recurso no encontrado.")
                    break
                case 500:
                    toast.error("Error en el servidor. Inténtalo más tarde.")
                    break
                default:
                    toast.error(data?.message || "Ocurrió un error inesperado.")
            }
        } else {
            toast.error("Error de conexión con el servidor.")
        }

        return Promise.reject(error)
    }
)
