export const animateValue = (
    element: HTMLElement,
    start: number,
    end: number,
    duration: number
): void => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const currentValue = Math.floor(progress * (end - start) + start);
        element.innerText = currentValue.toString();

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.innerText = end.toString(); // Asegura que el valor final sea exactamente el valor de `end`
        }
    };

    window.requestAnimationFrame(step);
};
