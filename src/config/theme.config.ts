export const THEME_PATHS = {
    light: '/themes/lara-light-blue/theme.css',
    dark: '/themes/soho-dark/theme.css'
};

export const getThemePath = (isDark: boolean) => {
    return isDark ? THEME_PATHS.dark : THEME_PATHS.light;
}; 