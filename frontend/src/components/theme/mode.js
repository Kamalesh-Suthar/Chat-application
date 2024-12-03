import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@/providers/theme-provider';
import { Switch } from '@nextui-org/switch';
import { Moon, Sun } from 'lucide-react';
const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const handleChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    return (_jsx(Switch, { className: 'fixed top-4 right-4', isSelected: theme === 'dark', onValueChange: handleChange, size: 'sm', startContent: _jsx(Sun, {}), endContent: _jsx(Moon, {}) }));
};
export default ThemeToggle;
