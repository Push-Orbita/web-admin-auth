import { authAxios } from "../../common/config/axios";
import { IAuthLoginReq, IAuthTokenReq } from "./interface/auth";



export const getTokenClient = async () => {
    //Seteo el client id y el client secret desde las variables de entorno
    const data: IAuthTokenReq = {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET, 
    };
    return await authAxios.post("/system/getClientToken", data);
};

export const authLogin = async (formData: IAuthLoginReq, token_client: string) => {
    return await authAxios.post("/auth/signin", formData, {
        headers: {
            "Authorization": `Bearer ${token_client}`
        }
    })
}