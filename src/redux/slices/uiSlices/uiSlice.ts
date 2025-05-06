import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUi {
  theme: boolean; // false = light theme, true = dark theme
  borderRadius: number;
  elevation: number;
  isLoadingAplications: boolean;
  isCollapsed: boolean;
  isOpenMenu: boolean;
  drawerWidth: number;
  isLoading: boolean;
  showGridlines: boolean;
}

// Función para obtener el tema inicial del localStorage o del sistema
const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  // Si no hay tema guardado, usar la preferencia del sistema
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState: IUi = {
  theme: getInitialTheme(),
  borderRadius: 1,
  elevation: 4,
  isLoadingAplications: false,
  isCollapsed: false,
  isOpenMenu: true,
  drawerWidth: 240,
  isLoading: false,
  showGridlines: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
      // Guardar en localStorage
      localStorage.setItem('theme', state.theme ? 'dark' : 'light');
    },
    toggleShowGridlines: (state) => {
      state.showGridlines = !state.showGridlines;
    },
    openMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setElevation: (state, action: PayloadAction<number>) => {
      state.elevation = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload;
    },
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    closeMenu: (state) => {
      state.isOpenMenu = false;
    },
  },
});

// Export the actions
export const { toggleTheme, openMenu, setElevation, setBorderRadius, toggleMenu, closeMenu, toggleShowGridlines } = uiSlice.actions;

// Export the reducer
export default uiSlice.reducer;
