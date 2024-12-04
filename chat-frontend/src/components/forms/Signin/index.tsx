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
import { Google } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";

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
    <Card className="w-screen max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Signin</CardTitle>
        <CardDescription>
          Use your credentials to login securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"grid gap-4"}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
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
                </FormItem>
              )}
            />
            <Button className={"w-full"} type="submit">
              Submit
            </Button>
          </form>
          <Separator>OR</Separator>
          <Button
            fullWidth={true}
            onClick={logGoogleUser}
            variant={"outline"}
            type={"button"}
          >
            <Google />
            Continue With Google
          </Button>
          <p className="text-center text-sm mt-2">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-muted-foreground hover:underline"
            >
              Sign up
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
