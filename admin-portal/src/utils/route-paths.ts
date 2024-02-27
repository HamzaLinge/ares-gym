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
        path: (idSupplement: string) => `/supplements/${idSupplement}/update`,
      },
    },
  },
  commands: {
    title: "Commands List",
    path: "/commands",
    children: {
      create: { title: "Order New Command", path: "/commands/create" },
      command: {
        title: "Order New Command",
        path: (idCommand: string) => `/commands/${idCommand}`,
      },
    },
  },
  categories: {
    title: "Categories List",
    path: "/categories",
    children: {
      category: {
        title: "Category",
        path: (idCategory: string) => `/categories/${idCategory}`,
      },
      create: {
        title: "Create New Category",
        path: (idCategory?: string) =>
          `/categories/create/${idCategory ? idCategory : ""}`,
      },
      update: {
        title: "Update Category",
        path: (idCategory: string) => `/categories/update/${idCategory}`,
      },
      edit: {
        title: "Edit Category",
        path: (idCategory: string) => `/categories/${idCategory}/edit`,
      },
    },
  },
  discounts: {
    title: "Discounts List",
    path: "/discounts",
    children: {
      discount: {
        title: "Discount",
        path: (idDiscount: string) => `/discounts/${idDiscount}`,
      },
      create: { title: "Create New Discount", path: "/discounts/create" },
      edit: {
        title: "Edit Discount",
        path: (idDiscount: string) => `/discounts/edit/${idDiscount}`,
      },
    },
  },
  settings: { title: "Settings", path: "/settings" },
};
