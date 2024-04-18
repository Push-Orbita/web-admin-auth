import axios from "axios"

export const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
})

export const AuthAxios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
})

export const cancelTokenSource = axios.CancelToken.source()

export const authorize = async (access_token: string) => {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + access_token
    AuthAxios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token
    return { Axios, AuthAxios }
}
