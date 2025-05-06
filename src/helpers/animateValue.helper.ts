export const animateValue = (
    element: HTMLElement,
    start: string,
    end: string,
    duration: number
): void => {
    const parseFormattedNumber = (value: string): number => {
        const normalizedValue = value.replace(/\./g, '').replace(',', '.');
        return parseFloat(normalizedValue);
    };

    const formatNumber = (value: number): string => {
        return value
            .toFixed(2) // Asegura dos decimales
            .replace('.', ',') // Cambia el punto decimal por una coma
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Añade puntos como separadores de miles
    };

    const startNumber = parseFormattedNumber(start);
    const endNumber = parseFormattedNumber(end);

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const currentValue = startNumber + (endNumber - startNumber) * progress;
        element.innerText = formatNumber(currentValue);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.innerText = formatNumber(endNumber);
        }
    };

    window.requestAnimationFrame(step);
};
