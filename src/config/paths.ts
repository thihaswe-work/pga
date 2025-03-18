export const paths = {
  auth: {
    register: {
      // name: "Register",
      path: "/auth/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    login: {
      // name: "Login",
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },
  app: {
    root: {
      path: "/app",
      getHref: () => {
        return "/app";
      },
    },
    dashboard: {
      // name: "Dashboard",
      path: "",
      getHref: () => {
        return "/app";
      },
    },
    home: {
      // name: "Home Page",
      path: "home",
      getHref: () => {
        return "/app/home";
      },
    },
    homeEdit: {
      path: "home/:section/edit",
      getHref: (section: string) => {
        return `/app/home/${section}/edit`;
      },
    },

    aboutus: {
      // name: "About Us",
      path: "about-us",
      getHref: () => {
        return "/app/about-us";
      },
    },
    milestone: {
      // name: "Miles Stone",
      path: "milestone",
      getHref: () => {
        return "/app/milestone";
      },
    },
    blogs: {
      // name: "Blog",
      path: "blog/blogs",
      getHref: () => {
        return "/app/blog/blogs";
      },
    },
    categories: {
      // name: "Blog",
      path: "blog/categories",
      getHref: () => {
        return "/app/blog/categories";
      },
    },
    categoriesEdit: {
      // name: "Blog",
      path: "blog/categories/:id/edit",
      getHref: (id: string | number) => {
        return `/app/blog/categories/${id}/edit`;
      },
    },
    categoriesCreate: {
      // name: "Blog",
      path: "blog/categories/create",
      getHref: () => {
        return "/app/blog/categories/create";
      },
    },
    banner: {
      // name: "Banner",
      path: "banner",
      getHref: () => {
        return "/app/banner";
      },
    },
    bannerEdit: {
      path: "banner/:id/edit",
      getHref: (id: string | number) => {
        return `/app/banner/${id}/edit`;
      },
    },
    bannerCreate: {
      path: "banner/create",
      getHref: () => {
        return `/app/banner/create`;
      },
    },

    feedback: {
      // name: "Banner",
      path: "feedback",
      getHref: () => {
        return "/app/feedback";
      },
    },
    roles: {
      // name: "Banner",
      path: "roles",
      getHref: () => {
        return "/app/roles";
      },
    },
    userMaintain: {
      // name: "Banner",
      path: "feedback",
      getHref: () => {
        return "/app/user-maintian";
      },
    },
  },
};
