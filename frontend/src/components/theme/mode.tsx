"use client";

import { useTheme } from "@/providers/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={handleThemeChange}
      // startContent={<Sun />}
      // endContent={<Moon />}
      className="z-10 fixed top-4 right-4"
    />
  );
};

export default ThemeToggle;
