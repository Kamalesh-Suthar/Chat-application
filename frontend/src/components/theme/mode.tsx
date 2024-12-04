"use client";

import { useTheme } from "@/providers/theme-provider";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={handleThemeChange}
      className="z-10 fixed top-4 right-4"
    />
  );
};

export default ThemeToggle;
