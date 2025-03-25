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
    jobAppliedForm: {
      path: "job-applied-form",
      getHref: () => {
        return "/app/job-applied-form";
      },
    },
    contactMessages: {
      path: "contact-messages",
      getHref: () => {
        return "/app/contact-messages";
      },
    },
    home: {
      root: {
        // name: "Home Page",
        path: "home",
        getHref: () => {
          return "/app/home";
        },
      },
      edit: {
        path: "home/:section/edit",
        getHref: (section: string) => {
          return `/app/home/${section}/edit`;
        },
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
      root: {
        path: "milestone",
        getHref: () => {
          return "/app/milestone";
        },
      },
      create: {
        path: "milestone/create",
        getHref: () => {
          return "/app/milestone/create";
        },
      },
      edit: {
        path: `milestone/:id/edit`,
        getHref: (id: number | string) => {
          return `/app/milestone/${id}/edit`;
        },
      },
    },
    blog: {
      blogs: {
        root: {
          // name: "Blog",
          path: "blog/blogs",
          getHref: () => {
            return "/app/blog/blogs";
          },
        },
        create: {
          // name: "Blog",
          path: "blog/blogs/create",
          getHref: () => {
            return "/app/blog/blogs/create";
          },
        },
        edit: {
          // name: "Blog",
          path: `blog/blogs/:id/edit`,
          getHref: (id: number | string) => {
            return `/app/blog/blogs/${id}/edit`;
          },
        },
      },
      categories: {
        root: {
          // name: "Blog",
          path: "blog/categories",
          getHref: () => {
            return "/app/blog/categories";
          },
        },
        edit: {
          // name: "Blog",
          path: "blog/categories/:id/edit",
          getHref: (id: string | number) => {
            return `/app/blog/categories/${id}/edit`;
          },
        },
        create: {
          // name: "Blog",
          path: "blog/categories/create",
          getHref: () => {
            return "/app/blog/categories/create";
          },
        },
      },
    },
    banner: {
      root: {
        // name: "Banner",
        path: "banner",
        getHref: () => {
          return "/app/banner";
        },
      },
      edit: {
        path: "banner/:id/edit",
        getHref: (id: string | number) => {
          return `/app/banner/${id}/edit`;
        },
      },
      create: {
        path: "banner/create",
        getHref: () => {
          return `/app/banner/create`;
        },
      },
    },
    career: {
      categories: {
        root: {
          // name: "Blog",
          path: "career/categories",
          getHref: () => {
            return "/app/career/categories";
          },
        },
        edit: {
          // name: "career",
          path: "career/categories/:id/edit",
          getHref: (id: string | number) => {
            return `/app/career/categories/${id}/edit`;
          },
        },
        create: {
          // name: "career",
          path: "career/categories/create",
          getHref: () => {
            return "/app/career/categories/create";
          },
        },
      },
      relatedFields: {
        root: {
          // name: "Blog",
          path: "career/related-fields",
          getHref: () => {
            return "/app/career/related-fields";
          },
        },
        edit: {
          // name: "career",
          path: "career/related-fields/:id/edit",
          getHref: (id: string | number) => {
            return `/app/career/related-fields/${id}/edit`;
          },
        },
        create: {
          // name: "career",
          path: "career/related-fields/create",
          getHref: () => {
            return "/app/career/related-fields/create";
          },
        },
      },
      regions: {
        root: {
          path: "career/regions",
          getHref: () => {
            return "/app/career/regions";
          },
        },
      },
      hiringPost: {
        root: {
          path: "career/hiring-post",
          getHref: () => {
            return "/app/career/hiring-post";
          },
        },
      },
    },
    feedback: {
      // name: "Banner",
      path: "feedback",
      getHref: () => {
        return "/app/feedback";
      },
    },
    roleAndPermission: {
      // name: "Banner",
      path: "role-and-permission",
      getHref: () => {
        return "/app/role-and-permission";
      },
    },
    userMaintain: {
      // name: "Banner",
      path: "user-maintain",
      getHref: () => {
        return "/app/user-maintain";
      },
    },
  },
};
