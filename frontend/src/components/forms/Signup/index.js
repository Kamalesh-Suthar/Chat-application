import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInWithGoogle } from '@/firebase.ts';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card.tsx';
import { Google } from '@mui/icons-material';
import { Separator } from '@/components/ui/separator.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { endpoints } from '@/constants/api';
const formSchema = z
    .object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm: z.string().min(8, 'Password must be at least 8 characters'),
})
    .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
});
const SignUp = () => {
    const navigate = useNavigate();
    const googleSignInMutation = useMutation({
        mutationFn: async (userData) => {
            try {
                const response = await fetch(endpoints.googleRegister, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Registration failed');
                }
                return data;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error('Registration failed');
            }
        },
        onSuccess: (data) => {
            // Store user data/token if needed
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            navigate('/dashboard');
        },
        onError: (error) => {
            console.error('Registration error:', error);
            // Add toast notification here
        },
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const logGoogleUser = async () => {
        const response = await signInWithGoogle();
        if (response) {
            const { user } = response;
            googleSignInMutation.mutate(user);
        }
    };
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirm: '',
        },
    });
    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (_jsxs(Card, { className: 'flex flex-col items-center mx-auto max-w-sm', children: [_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: 'flex flex-col w-full max-w-screen-lg space-y-2 justify-center gap-2.5', children: [_jsx("legend", { className: 'font-bold text-xl', children: "Sign Up" }), _jsx(FormField, { control: form.control, name: 'email', render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: 'example@test.com', ...field }) }), _jsx(FormDescription, { children: "Your email address" }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: 'password', render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsxs("div", { className: 'relative flex w-full items-center space-x-2', children: [_jsx(Input, { type: showPassword ? 'text' : 'password', placeholder: 'Password', ...field }), _jsx("div", { className: 'absolute right-2 cursor-pointer', onClick: togglePasswordVisibility, children: showPassword ? (_jsx(EyeOff, { className: 'w-5 h-5' })) : (_jsx(Eye, { className: 'w-5 h-5' })) })] }) }), _jsx(FormDescription, { children: "Please enter a valid password" }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: 'confirm', render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Confirm Password" }), _jsx(FormControl, { children: _jsx(Input, { type: 'password', placeholder: 'Confirm Password', ...field }) }), _jsx(FormDescription, { children: "Passwords must match." }), _jsx(FormMessage, {})] })) }), _jsx(Button, { className: 'w-full', type: 'submit', children: "Submit" })] }) }), _jsx(Separator, { className: 'my-4' }), _jsxs(Button, { className: 'w-full', onClick: logGoogleUser, children: [_jsx(Google, {}), " Continue with Google"] }), _jsx("p", { className: 'w-full text-center font-bold my-3', children: "OR" }), _jsxs("p", { children: [_jsx("span", { className: 'font-bold', children: "Have an account? " }), _jsxs(Link, { to: '/signin', className: 'underline text-blue-700', children: ["Sign-in", ' '] }), "here."] })] }));
};
export default SignUp;
