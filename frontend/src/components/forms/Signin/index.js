import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInWithGoogle } from '@/firebase.ts';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
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
import userStore from "@/stores/userStore.tsx";
const formSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = userStore();
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const logGoogleUser = async () => {
        const response = await signInWithGoogle();
        signIn(response.user);
        navigate("/", { replace: true });
    };
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (_jsxs(Card, { className: 'flex flex-col items-center mx-auto max-w-sm', children: [_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: 'flex flex-col w-full max-w-screen-lg space-y-2 justify-center gap-2.5', children: [_jsx("legend", { className: 'font-bold text-xl', children: "Sign in" }), _jsx(FormField, { control: form.control, name: 'email', render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: 'example@test.com', ...field }) }), _jsx(FormDescription, { children: "Your email address" }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: 'password', render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsxs("div", { className: 'relative flex w-full items-center space-x-2', children: [_jsx(Input, { type: showPassword ? 'text' : 'password', placeholder: 'Password', ...field }), _jsx("div", { className: 'absolute right-2 cursor-pointer', onClick: togglePasswordVisibility, children: showPassword ? (_jsx(EyeOff, { className: 'w-5 h-5' })) : (_jsx(Eye, { className: 'w-5 h-5' })) })] }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { className: 'w-full', type: 'submit', children: "Submit" })] }) }), _jsx(Separator, { className: 'my-4' }), _jsxs(Button, { className: 'w-full', onClick: logGoogleUser, children: [_jsx(Google, {}), " Continue With Google"] }), _jsx("p", { className: 'w-full text-center font-bold my-3', children: "OR" }), _jsxs("p", { children: [_jsx("span", { className: 'font-bold', children: "No account? " }), _jsxs(Link, { to: '/signup', className: 'underline text-blue-700', children: ["Sign-up", ' '] }), "here."] })] }));
};
export default SignIn;
