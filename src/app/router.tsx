/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { paths } from "@/config/paths";

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from "./routes/app/root";
import { ProtectedRoute } from "@/lib/auth";

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      lazy: () => import("./routes/landing").then(convert(queryClient)),
    },
    {
      path: paths.auth.register.path,
      lazy: () => import("./routes/auth/register").then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import("./routes/auth/login").then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.dashboard.path,
          lazy: () =>
            import("./routes/app/dashboard").then(convert(queryClient)),
        },
        {
          path: paths.app.home.path,
          lazy: () => import("./routes/app/home").then(convert(queryClient)),
        },
        {
          path: paths.app.aboutus.path,
          lazy: () => import("./routes/app/aboutus").then(convert(queryClient)),
        },
        {
          path: paths.app.banner.path,
          lazy: () => import("./routes/app/banner").then(convert(queryClient)),
        },
        {
          path: paths.app.feedback.path,
          lazy: () =>
            import("./routes/app/feedback").then(convert(queryClient)),
        },
        {
          path: paths.app.milestone.path,
          lazy: () =>
            import("./routes/app/milestone").then(convert(queryClient)),
        },
        {
          path: paths.app.categories.path,
          lazy: () =>
            import("./routes/app/categories").then(convert(queryClient)),
        },
        {
          path: paths.app.blogs.path,
          lazy: () => import("./routes/app/blogs").then(convert(queryClient)),
        },
        {
          path: paths.app.roles.path,
          lazy: () => import("./routes/app/roles").then(convert(queryClient)),
        },
        {
          path: paths.app.userMaintain.path,
          lazy: () =>
            import("./routes/app/userMaintain").then(convert(queryClient)),
        },
      ],
    },
    {
      path: "*",
      lazy: () => import("./routes/not-found").then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
