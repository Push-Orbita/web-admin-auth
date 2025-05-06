export const applyTailwindClasses = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Procesar etiquetas comunes con clases predefinidas
    doc.querySelectorAll("h1").forEach((el) => el.classList.add("text-4xl", "font-bold", "mb-4"));
    doc.querySelectorAll("p").forEach((el) => el.classList.add("text-base", "leading-6", "mb-4"));

    // Procesar listas
    doc.querySelectorAll("ul").forEach((el) => {
        el.classList.add("list-disc", "pl-5", "mb-4");
        el.querySelectorAll("li").forEach((li) => li.classList.add("marker:text-primary-500"));
    });
    doc.querySelectorAll("ol").forEach((el) => el.classList.add("list-decimal", "pl-5", "mb-4"));

    // Procesar enlaces
    doc.querySelectorAll("a").forEach((el) => {
        el.classList.add("text-blue-500", "hover:underline");
        const href = el.getAttribute("href");
        if (href && !/^https?:\/\//i.test(href)) {
            // Si el enlace no tiene esquema, añade "https://"
            el.setAttribute("href", `https://${href}`);
        }
    });

    // Procesar elementos con estilos inline
    doc.querySelectorAll("*[style]").forEach((el) => {
        const style = el.getAttribute("style");

        if (style) {
            const styles = style.split(";");
            styles.forEach((styleRule) => {
                const [property, value] = styleRule.split(":").map((str) => str.trim());

                // Detectar colores y mapearlos a clases Tailwind
                if (property === "color") {
                    const rgbMatch = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (rgbMatch) {
                        const [r, g, b] = rgbMatch.slice(1).map(Number);
                        const tailwindColor = mapRgbToTailwindColor(r, g, b);
                        if (tailwindColor) el.classList.add(tailwindColor);
                    }
                }
            });

            // Eliminar el atributo style para evitar conflictos
            el.removeAttribute("style");
        }
    });

    return doc.body.innerHTML;
};

// Función para mapear RGB a clases de Tailwind
const mapRgbToTailwindColor = (r: number, g: number, b: number): string | null => {
    const colorMapping: { [key: string]: string } = {
        "255, 0, 0": "text-red-500",
        "230, 0, 0": "text-red-600",
        "0, 255, 0": "text-green-500",
        "0, 0, 255": "text-blue-500",
        "0, 0, 0": "text-black",
        "255, 255, 255": "text-white",
    };

    const rgbKey = `${r}, ${g}, ${b}`;
    return colorMapping[rgbKey] || null;
};
