import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Home from "@/pages/Home"
import { ThemeProvider } from '@/providers/theme-provider.tsx';
import ThemeToggle from '@/components/theme/mode.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './providers/queryClient';

function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeToggle />
                <BrowserRouter>
                    <Routes>
                        <Route index path={'/'} element={<Home />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/signin' element={<Signin />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App
