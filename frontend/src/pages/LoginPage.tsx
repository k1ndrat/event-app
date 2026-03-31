import { AlertMessage } from "@/components/AlertMessage";
import { AuthFooter } from "@/components/auth/Footer";
import { AuthHeader } from "@/components/auth/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/utils";
import { GuestPaths } from "@/routes/GuestRoutes";
import { loginFormSchema, type TLoginFormValues } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, isError, error } = useLogin();

  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "haker0@ukr.net",
      password: "Qwerty321!",
    },
  });

  const onSubmit = (values: TLoginFormValues) => {
    login(values);
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <AuthHeader
          title="Login to account"
          description="Enter your credentials to access the admin panel"
        />

        <CardContent>
          {isError && <AlertMessage errorMessage={errorMessage} />}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@mail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <AuthFooter
          title="Don't have an account?"
          link={GuestPaths.Signup}
          linkLabel="Sign Up"
        />
      </Card>
    </div>
  );
};
