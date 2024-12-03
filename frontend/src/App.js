import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Home from "@/pages/Home";
import { ThemeProvider } from '@/providers/theme-provider';
import ThemeToggle from '@/components/theme/mode';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './providers/queryClient';
function App() {
    return (_jsx(ThemeProvider, { children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(ThemeToggle, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { index: true, path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/signup', element: _jsx(Signup, {}) }), _jsx(Route, { path: '/signin', element: _jsx(Signin, {}) })] }) })] }) }));
}
export default App;
