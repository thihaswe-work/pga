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
      root: {
        // name: "Home Page",
        path: "about-us",
        getHref: () => {
          return "/app/about-us";
        },
      },
      edit: {
        path: "about-us/:section/edit",
        getHref: (section: string) => {
          return `/app/about-us/${section}/edit`;
        },
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
        edit: {
          // name: "career",
          path: "career/regions/:id/edit",
          getHref: (id: string | number) => {
            return `/app/career/regions/${id}/edit`;
          },
        },
        create: {
          // name: "career",
          path: "career/regions/create",
          getHref: () => {
            return "/app/career/regions/create";
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
        edit: {
          // name: "career",
          path: "career/hiring-post/:id/edit",
          getHref: (id: string | number) => {
            return `/app/career/hiring-post/${id}/edit`;
          },
        },
        create: {
          // name: "career",
          path: "career/hiring-post/create",
          getHref: () => {
            return "/app/career/hiring-post/create";
          },
        },
      },
    },
    // feedback: {
    //   // name: "Banner",
    //   path: "feedback",
    //   getHref: () => {
    //     return "/app/feedback";
    //   },
    // },
    roleAndPermission: {
      // name: "Banner",
      root: {
        path: "role-and-permission",
        getHref: () => {
          return "/app/role-and-permission";
        },
      },
      edit: {
        // name: "career",
        path: "role-and-permission/:id/edit",
        getHref: (id: string | number) => {
          return `/app/role-and-permission/${id}/edit`;
        },
      },
      create: {
        // name: ",
        path: "role-and-permission/create",
        getHref: () => {
          return "/app/role-and-permission/create";
        },
      },
    },
    userMaintain: {
      root: {
        path: "user-maintain",
        getHref: () => {
          return "/app/user-maintain";
        },
      },
      edit: {
        // name: ",
        path: "user-maintain/:id/edit",
        getHref: (id: string | number) => {
          return `/app/user-maintain/${id}/edit`;
        },
      },
      create: {
        // name: ",
        path: "user-maintain/create",
        getHref: () => {
          return "/app/user-maintain/create";
        },
      },
    },
  },
};
