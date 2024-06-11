import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { errorInterface } from "../interfaces/errors.interface";

export class BaseService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private handleResponseError = (error: any): never => {
    if (error.response && error.response.data) {
      const responseData: errorInterface = error.response.data;
      throw new Error(`${responseData.code}: ${responseData.message}`);
    } else {
      throw new Error("Error desconocido");
    }
  };

  // Realiza una solicitud HTTP genérica
  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await Axios.request<T>({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      // Maneja cualquier error de respuesta del servidor
      this.handleResponseError(error);
      // Lanza un error si algo sale mal, para que no se devuelva 'undefined'
      throw new Error("Error al realizar la solicitud");
    }
  }

  // Métodos para realizar solicitudes HTTP específicas
  async get<T>(
    endpoint: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return await this.request<T>("GET", fullUrl, { params, ...config });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return await this.request<T>("POST", fullUrl, data, config);
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return await this.request<T>("PATCH", fullUrl, data, config);
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return await this.request<T>("DELETE", fullUrl, undefined, config);
  }
}
