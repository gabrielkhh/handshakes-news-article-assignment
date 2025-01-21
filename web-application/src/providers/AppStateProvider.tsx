import React, { createContext, useContext, useState } from 'react'

export type ThemeContextType = {
    themeIsDark: boolean;
    setThemeIsDark: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

const ThemeContext = createContext<ThemeContextType>(null);

const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeIsDark, setThemeIsDark] = useState<boolean>(false);

    return (
        <ThemeContext.Provider value={{ themeIsDark, setThemeIsDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useAppStateContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useAppStateContext must be used within a AppStateProvider");
    }
    return context;
  };

export default AppStateProvider