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
  categories: { title: "Categories List", path: "/categories" },
  discounts: { title: "Discounts List", path: "/discounts" },
  settings: { title: "Settings", path: "/settings" },
};
