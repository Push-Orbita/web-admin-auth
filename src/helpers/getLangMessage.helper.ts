import { lang } from "@langs/index";

export const getLangMessage = (moduleKey: string, path: string) => {
    const parts = path.split(".");  // Ejemplo: "form.title"
    return parts.reduce((acc: any, part) => acc?.[part], lang[moduleKey as keyof typeof lang]) || "Mensaje no encontrado";
};
