import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { z } from "zod";
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
import useAuth from "@/store/store";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { env } from "@/config/env";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().optional(),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`${env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Login failed. Please try again.");
        return;
      }

      const data = await response.json();

      // Store user and token in Zustand
      const { setToken } = useAuth.getState();

      // Assuming API returns a `user` object
      setToken(data.access_token); // Assuming API returns a `token`

      toast(
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full bg-background">
            <IoMdCheckmark className="text-primaryText text-xl font-bold" />
          </div>
          <span>You are now logged in</span>
        </div>
      );

      // Redirect or perform other post-login actions
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="px-11">
      <div className="mb-10 text-center">
        <h5 className="flex gap-2 font-bold text-3xl justify-center">
          <span>Welcome to</span>
          <span className="text-primaryText">PassionGeek</span>
        </h5>
        <span className="text-secondaryText text-lg">
          Welcome back. Enter your credentials to access your account.
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-secondaryText"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="...@gmail.com"
                    {...field}
                    className={`${
                      form.formState.errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field with Eye Toggle */}
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
                      placeholder="Enter your login password"
                      {...field}
                      aria-invalid={
                        form.formState.errors.password ? "true" : "false"
                      } // Add this line
                      className={`pr-10 
                        ${
                          form.formState.errors.password
                            ? `aria-invalid:ring-destructive/20    ${
                                !showPassword
                                  ? "aria-invalid:text-destructive "
                                  : ""
                              }`
                            : ""
                        }`}
                    />
                    <button
                      type="button"
                      className={`${
                        form.formState.errors.password ? "text-red-500" : ""
                      } absolute inset-y-0 right-3 flex items-center `}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me Checkbox */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Remember me</FormLabel>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="bg-primaryText w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
