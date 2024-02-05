export const routePaths = {
  auth: { title: "Authentication", path: "/auth" },
  dashboard: { title: "Dashboard", path: "/dashboard" },
  users: { title: "Users List", path: "/users" },
  supplements: {
    title: "Supplements List",
    path: "/supplements",
    children: {
      supplement: {
        title: "Supplement",
        path: (idSupplement: string) => `/supplements/${idSupplement}`,
      },
      create: {
        title: "Create New Supplement",
        path: "/supplements/create",
      },
      update: {
        title: "Update Supplement",
        path: (idSupplement: string) => `/supplements/update/${idSupplement}`,
      },
    },
  },
  commands: { title: "Commands List", path: "/commands" },
  categories: {
    title: "Categories List",
    path: "/categories",
    children: {
      create: {
        title: "Create New Category",
        path: (idCategory?: string) =>
          `/categories/create/${idCategory ? idCategory : ""}`,
      },
      update: {
        title: "Update Category",
        path: (idCategory: string) => `/categories/update/${idCategory}`,
      },
    },
  },
  discounts: {
    title: "Discounts List",
    path: "/discounts",
    children: {
      create: { title: "Create New Discount", path: "/discounts/create" },
    },
  },
  settings: { title: "Settings", path: "/settings" },
};
