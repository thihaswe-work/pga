import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { paths } from "@/config/paths";
import useAuth from "@/store/store";

type LayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
        replace: true,
      });
    }
  }, [token, navigate, redirectTo]);

  return <>{children}</>;
};
