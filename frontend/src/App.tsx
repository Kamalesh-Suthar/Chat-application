import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Home from "@/pages/Home"
import { ThemeProvider } from '@/providers/theme-provider';
import ThemeToggle from '@/components/theme/mode';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './providers/queryClient';
import { SidebarProvider } from './components/ui/sidebar';

function App() {
    return (
        <ThemeProvider>
            <SidebarProvider>
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
            </SidebarProvider>
        </ThemeProvider>
    );
}

export default App
