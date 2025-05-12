import axios from "axios"
import { toast } from "react-hot-toast"
import { store } from "@redux/store/store"
import { clearTokens, LogOut, setUserToken } from "@redux/slices/auth/autSlice"
import { AuthApi } from "@features/auth/service/auth.service"

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
        const state = store.getState()
        const tokenUser = state.auth.tokenUser

        // Si el error es 401, no es una petición de refresh y hay token
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            tokenUser &&
            !originalRequest.url.includes('/auth/refresh-token')
        ) {
            originalRequest._retry = true

            try {
                // Intentar refrescar el token usando el access token
                const response = await AuthApi.refreshToken(tokenUser)
                const newToken = response.data.tokens?.access_token

                // Si no hay nuevo token, cerrar sesión y cortar ciclo
                if (!newToken) {
                    store.dispatch(clearTokens())
                    store.dispatch(LogOut())
                    toast.error("No se pudo refrescar el token. Por favor, inicia sesión nuevamente.")
                    window.location.href = '/login'
                    return Promise.reject('No se recibió nuevo token')
                }

                // Actualizar el token en el store
                store.dispatch(setUserToken({
                    ...state.auth,
                    tokenUser: newToken
                }))

                // Actualizar el token en los headers
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                Axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

                // Reintentar la petición original
                return Axios(originalRequest)
            } catch (refreshError) {
                // Si falla el refresh, cerrar sesión
                store.dispatch(clearTokens())
                store.dispatch(LogOut())
                toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.")
                window.location.href = '/login'
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
