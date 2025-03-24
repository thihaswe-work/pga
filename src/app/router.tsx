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
            import("./routes/app/dashboard/dashboard").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.jobAppliedForm.path,
          lazy: () =>
            import("./routes/app/job-applied-forms/index").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.contactMessages.path,
          lazy: () =>
            import("./routes/app/contact-messages/index").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.home.root.path,
          lazy: () =>
            import("./routes/app/home/home").then(convert(queryClient)),
        },
        {
          path: paths.app.home.edit.path,
          lazy: () =>
            import("./routes/app/home/edit").then(convert(queryClient)),
        },
        {
          path: paths.app.aboutus.path,
          lazy: () =>
            import("./routes/app/aboutus/aboutus").then(convert(queryClient)),
        },
        {
          path: paths.app.banner.root.path,
          lazy: () =>
            import("./routes/app/banner/banner").then(convert(queryClient)),
        },
        {
          path: paths.app.banner.edit.path,
          lazy: () =>
            import("./routes/app/banner/edit").then(convert(queryClient)),
        },
        {
          path: paths.app.banner.create.path,
          lazy: () =>
            import("./routes/app/banner/create").then(convert(queryClient)),
        },
        {
          path: paths.app.feedback.path,
          lazy: () =>
            import("./routes/app/feedback/feedback").then(convert(queryClient)),
        },
        {
          path: paths.app.milestone.root.path,
          lazy: () =>
            import("./routes/app/milestone/milestone").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.milestone.create.path,
          lazy: () =>
            import("./routes/app/milestone/create").then(convert(queryClient)),
        },
        {
          path: paths.app.milestone.edit.path,
          lazy: () =>
            import("./routes/app/milestone/edit").then(convert(queryClient)),
        },
        {
          path: paths.app.feedback.path,
          lazy: () =>
            import("./routes/app/feedback/feedback").then(convert(queryClient)),
        },
        {
          path: paths.app.blog.categories.root.path,
          lazy: () =>
            import("./routes/app/blog/categories/categories").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.blog.categories.edit.path,
          lazy: () =>
            import("./routes/app/blog/categories/edit").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.blog.categories.create.path,
          lazy: () =>
            import("./routes/app/blog/categories/create").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.blog.blogs.root.path,
          lazy: () =>
            import("./routes/app/blog/blogs/blogs").then(convert(queryClient)),
        },
        {
          path: paths.app.blog.blogs.create.path,
          lazy: () =>
            import("./routes/app/blog/blogs/create").then(convert(queryClient)),
        },
        {
          path: paths.app.blog.blogs.edit.path,
          lazy: () =>
            import("./routes/app/blog/blogs/edit").then(convert(queryClient)),
        },
        {
          path: paths.app.career.categories.root.path,
          lazy: () =>
            import("./routes/app/career/categories/index").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.career.relatedFields.root.path,
          lazy: () =>
            import("./routes/app/career/relatedFields/index").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.career.regions.root.path,
          lazy: () =>
            import("./routes/app/career/regions/index").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.career.hiringPost.root.path,
          lazy: () =>
            import("./routes/app/career/hiringPost/index").then(
              convert(queryClient)
            ),
        },

        {
          path: paths.app.feedback.path,
          lazy: () =>
            import("./routes/app/feedback/feedback").then(convert(queryClient)),
        },
        {
          path: paths.app.roleAndPermission.path,
          lazy: () =>
            import("./routes/app/roleAndPermission/roles").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.app.userMaintain.path,
          lazy: () =>
            import("./routes/app/userMaintain/userMaintain").then(
              convert(queryClient)
            ),
        },
        {
          path: "test",
          lazy: () =>
            import("../testtable/test-page").then(convert(queryClient)),
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
