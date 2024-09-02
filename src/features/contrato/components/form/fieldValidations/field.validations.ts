import { t } from "i18next";
import { lang } from "../../../../../langs";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    plan: Yup.string().required(t(lang.Contract.validation.planIsRequired.toString())),
    organizacion: Yup.string().required(t(lang.Contract.validation.organizationIsRequired.toString())),
    fechaVencimiento: Yup.string().required(t(lang.Contract.validation.expireDateIsRequired.toString())),
});