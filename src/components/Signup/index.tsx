// import {FormEvent, useState} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from '../../firebase';
//
// const Signup = () => {
//     const navigate = useNavigate();
//
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
//
//     const onSubmit = async (e: FormEvent) => {
//         e.preventDefault()
//
//         await createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 console.log(user);
//                 navigate("/login")
//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage);
//                 // ..
//             });
//
//
//     }
//
//     return (
//         <main >
//             <section>
//                 <div>
//                     <div>
//                         <h1> FocusApp </h1>
//                         <form onSubmit={onSubmit}>
//                             <div>
//                                 <label htmlFor="email-address">
//                                     Email address
//                                 </label>
//                                 <input
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     placeholder="Email address"
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="password">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     placeholder="Password"
//                                 />
//                             </div>
//
//                             <button
//                                 type="submit"
//
//                             >
//                                 Sign up
//                             </button>
//
//                         </form>
//
//                         <p>
//                             Already have an account?
//                             <NavLink to="/login" >
//                                 Sign in
//                             </NavLink>
//                         </p>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     )
// }
//
// export default Signup

import { signInWithGoogle } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Google } from '@mui/icons-material';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

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
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const logGoogleUser = async () => {
        const response = await signInWithGoogle();
        console.log(response);
    };

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirm: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Card className={'flex flex-col items-center mx-auto max-w-sm'}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={'flex flex-col w-full max-w-screen-lg space-y-2 justify-center gap-2.5'}
                >
                    <legend className={'font-bold text-xl'}>Sign Up</legend>
                    <FormField
                        control={form.control}
                        name={'email'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder={'example@test.com'} {...field} />
                                </FormControl>
                                <FormDescription>Your email address</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'password'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className={'relative flex w-full items-center space-x-2'}>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={'Password'}
                                            {...field}
                                        />
                                        <div
                                            className={'absolute right-2 cursor-pointer'}
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <EyeOff className={'w-5 h-5'} />
                                            ) : (
                                                <Eye className={'w-5 h-5'} />
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription>Please enter a valid password</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'confirm'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type={'password'} placeholder={'Confirm Password'} {...field} />
                                </FormControl>
                                <FormDescription>Passwords must match.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className={'w-full'} type={'submit'}>
                        Submit
                    </Button>
                </form>
            </Form>
            <Separator className={'my-4'} />
            <Button className={'w-full'} onClick={logGoogleUser}>
                <Google /> Continue with Google
            </Button>
            <p className={'w-full text-center font-bold my-3'}>OR</p>
            <p>
                <span className={'font-bold'}>Have an account? </span>
                <Link to={'/signin'} className={'underline text-blue-700'}>
                    Sign-in{' '}
                </Link>
                here.
            </p>
        </Card>
    );
};
export default SignUp;
