"use client";

import { signInWithGoogle } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Google } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { endpoints } from "@/constants/api";
import userStore from "@/stores/userStore";
import { useSpinner } from "@/providers/spinner-provider";

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const SignUp = () => {
  const { toggleSpinner } = useSpinner();
  const router = useRouter();
  const { signIn } = userStore();
  const googleSignInMutation = useMutation({
    mutationFn: async (userData: User) => {
      const response = await fetch(endpoints.googleRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUserData: userData }),
      });
      return response;
    },
    onSuccess: async (res) => {
      if (res.status === 201 || res.status === 200) {
        const userData = await res.json();
        signIn(userData);
        router.replace("/");
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const logGoogleUser = async () => {
    try {
      toggleSpinner();
      const response = await signInWithGoogle();
      if (response) {
        const { user } = response;
        googleSignInMutation.mutate(user);
      }
    } finally {
      toggleSpinner();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-screen max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Use your credentials to login securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={
              "flex flex-col w-full max-w-screen-lg space-y-2 justify-center gap-2.5"
            }
          >
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder={"example@test.com"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div
                      className={"relative flex w-full items-center space-x-2"}
                    >
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={"Password"}
                        {...field}
                      />
                      <div
                        className={"absolute right-2 cursor-pointer"}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className={"w-5 h-5"} />
                        ) : (
                          <Eye className={"w-5 h-5"} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"confirm"}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={"password"}
                      placeholder={"Confirm Password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type={"submit"}>Submit</Button>
          </form>
          <Separator>OR</Separator>
          <Button
            fullWidth={true}
            variant={"outline"}
            onClick={logGoogleUser}
            type={"button"}
          >
            <Google /> Continue with Google
          </Button>
          <p className="text-sm text-center mt-2">
            <span className={"font-bold"}>Have an account? </span>
            <Link
              href={"/signin"}
              className={"text-muted-foreground hover:underline"}
            >
              Sign-in{" "}
            </Link>
            here.
          </p>
        </Form>
      </CardContent>
    </Card>
  );
};
export default SignUp;
