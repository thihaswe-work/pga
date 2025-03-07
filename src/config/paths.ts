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
    blog: {
      // name: "Blog",
      path: "blog",
      getHref: () => {
        return "/app/blog";
      },
    },
    banner: {
      // name: "Banner",
      path: "banner",
      getHref: () => {
        return "/app/banner";
      },
    },
    feedback: {
      // name: "Banner",
      path: "feedback",
      getHref: () => {
        return "/app/feedback";
      },
    },
  },
};
