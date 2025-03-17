import { AuthLayout } from "@/components/layouts";
import LoginForm from "@/features/auth/login-form";

export default function Login() {
  return (
    <AuthLayout>
      <div className="w-screen h-screen bg-[url('/background.svg')] bg-contain bg-center flex items-center justify-center relative">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="relative  bg-white shadow-lg rounded-lg max-w-[540px] h-[580px] items-center flex w-full">
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
}
