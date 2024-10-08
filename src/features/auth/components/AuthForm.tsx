import { FormTextInput } from "@components/common/forms/FormTextInput";
import { useAppDispatch } from "@hooks/reduxHook";
import useQueryApi from "@hooks/useQueryApi";
import { Form, Formik, FormikHelpers } from "formik";
import { t } from "i18next";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import toast from "react-hot-toast";
import { lang } from "../../../langs";
import { AuthPostDTO } from "../model/dtos/auth.dto";
import { AuthApi } from "../service/auth.service";
import { AuthHeader } from "./AuthHeader";
import { transformResponse } from "./transformResponse";
import { setClientToken } from "@redux/slices/auth/autSlice";


export const AuthForm = () => {
    const dispatch = useAppDispatch();
    const initialValues: AuthPostDTO = {
        email: 'nahuel14321@gmail.com',
        password: 'Pass@12345.'
    };

    const getAuthToken = async () => {
        return await AuthApi.postAuthSistem({
            clientId: import.meta.env.VITE_APP_CLIENT_ID,
            clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET
        });
    };

    const { data: clientTokenData } = useQueryApi<any>(
        "Client-token",
        () => getAuthToken(),
        {
            onSuccess: (data: any) => {
                if (data && data.access_token) {
                    dispatch(setClientToken(data.access_token));
                }
            }
        }
    );

    console.log(clientTokenData);
   

    const handleSubmit = async (values: AuthPostDTO, { setSubmitting }: FormikHelpers<AuthPostDTO>) => {
        try {
            // const response = await AuthApi.postAuth(values, clientTokenData?.access_token);  // Llamada a la API de autenticación
            // const transformedData = transformResponse(response.data);  // Transforma la respuesta del backend al formato que necesita tu frontend
            // console.log(response.data)
            // Asegúrate de que transformedData cumpla con UserEntity
            // if (transformedData) {
            //     dispatch(setUserToken(transformedData as unknown as UserEntity));
            //     console.log(transformedData as unknown as UserEntity);
            //     toast.success(t(lang.login.messages.loginSuccess));
            // } else {
            //     console.error('transformedData es nulo');
            //     toast.error(t(lang.login.messages.loginError));
            // }
        } catch (error) {
            console.error('Hubo un error al iniciar sesión:', error);
            toast.error(t(lang.login.messages.loginError));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="w-full border-round-2xl" style={{ padding: 30 }}>
            <div className="flex flex-column justify-content-center flex-wrap w-full gap-2">
                <AuthHeader />
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className="grid col-12">
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12">
                                    <FormTextInput label={t(lang.login.form.usuario)} name={'email'} />
                                </div>
                                <div className="field col-12">
                                    <FormTextInput type={'password'} label={t(lang.login.form.password)} name={'password'} />
                                </div>
                            </div>
                            <div className="grid col-12 mt-5">
                                <div className="flex flex-column justify-content-center flex-wrap w-full gap-2">
                                    <Button type="submit" className="uppercase" label={t(lang.common.actions.enter)} disabled={isSubmitting} />
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};
