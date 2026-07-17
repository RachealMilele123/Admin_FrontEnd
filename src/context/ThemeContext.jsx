import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMantineColorScheme } from "@mantine/core";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("scholarlink-color-scheme");

    if (stored === "dark" || stored === "light") {
      setColorScheme(stored);
    } else {
      setColorScheme("light");
    }

    setInitialized(true);
  }, [setColorScheme]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    window.localStorage.setItem("scholarlink-color-scheme", colorScheme || "light");
  }, [colorScheme, initialized]);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const value = useMemo(
    () => ({
      colorScheme: colorScheme || "light",
      toggleColorScheme,
    }),
    [colorScheme, toggleColorScheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }

  return context;
}
