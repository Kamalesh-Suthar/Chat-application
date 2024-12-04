"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithGoogle } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import userStore from "@/stores/userStore";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = userStore();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const logGoogleUser = async () => {
    const response = await signInWithGoogle();
    signIn(response.user);
    router.push("/");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Handle form submission
      console.log(values);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Signin</CardTitle>
        <CardDescription>
          Use your credentials to login securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={
              "flex flex-col w-full max-w-screen-lg space-y-2 justify-center gap-2.5 p-0"
            }
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@test.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
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
                </FormItem>
              )}
            />
            <Button className={"w-full"} type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <Button className={"w-full"} onClick={logGoogleUser}>
          Continue With Google
        </Button>
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-sm text-muted-foreground hover:underline"
        >
          Sign up
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignIn;
