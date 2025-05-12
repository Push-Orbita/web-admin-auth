import { FormTextInput } from "@components/common/forms/FormTextInput";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { setUserToken } from "@redux/slices/auth/autSlice";
import { UserEntity } from "@redux/slices/auth/interface/user.entity";
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
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const clientToken = useAppSelector((state) => state.auth.tokenSistem);

    const initialValues: AuthPostDTO = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values: AuthPostDTO, { setSubmitting }: FormikHelpers<AuthPostDTO>) => {
        try {
            if (!clientToken) {
                toast.error("El token del cliente no está disponible");
                return;
            }

            const response = await AuthApi.postAuth(values, {
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                },
            });

            const transformedData = transformResponse(response.data);

            if (transformedData) {
                await dispatch(setUserToken({
                    ...transformedData,
                    refreshToken: transformedData.refreshToken || response.data.tokens.refresh_token
                } as unknown as UserEntity));
                toast.success(t(lang.login.messages.loginSuccess));
                navigate('/home');
            } else {
                toast.error(t(lang.login.messages.loginError));
            }
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            const errorMessage = error.response?.data?.message || t(lang.login.messages.loginError);
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="w-full border-round-2xl" style={{ padding: 30 }}>
            <div className="flex flex-column justify-content-center flex-wrap w-full gap-2">
                <AuthHeader />
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="grid col-12">
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12">
                                    <FormTextInput
                                        label={t(lang.login.form.usuario)}
                                        name={'email'}
                                        autoComplete="username"
                                    />
                                </div>
                                <div className="field col-12">
                                    <FormTextInput
                                        type={'password'}
                                        label={t(lang.login.form.password)}
                                        name={'password'}
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>
                            <div className="grid col-12 mt-5">
                                <div className="flex flex-column justify-content-center flex-wrap w-full gap-2">
                                    <Button
                                        type="submit"
                                        className="uppercase"
                                        label={t(lang.common.actions.enter)}
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};
