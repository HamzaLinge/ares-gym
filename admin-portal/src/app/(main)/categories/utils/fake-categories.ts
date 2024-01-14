const categories = [
  {
    id: "1",
    name: "Health & Wellness",
    children: [
      {
        id: "1-1",
        name: "Supplements",
        children: [
          { id: "1-1-1", name: "Vitamins" },
          { id: "1-1-2", name: "Minerals" },
        ],
      },
      {
        id: "1-2",
        name: "Fitness",
        children: [
          { id: "1-2-1", name: "Yoga" },
          { id: "1-2-2", name: "Cardio Equipment" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Electronics",
    children: [
      {
        id: "2-1",
        name: "Computers & Accessories",
        children: [
          { id: "2-1-1", name: "Laptops" },
          { id: "2-1-2", name: "Desktops" },
        ],
      },
      {
        id: "2-2",
        name: "Smartphones",
        children: [
          { id: "2-2-1", name: "Android Phones" },
          { id: "2-2-2", name: "iPhones" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Fashion",
    children: [
      {
        id: "3-1",
        name: "Women's Clothing",
        children: [
          { id: "3-1-1", name: "Dresses" },
          { id: "3-1-2", name: "Outerwear" },
        ],
      },
      {
        id: "3-2",
        name: "Men's Clothing",
        children: [
          { id: "3-2-1", name: "Shirts" },
          { id: "3-2-2", name: "Pants" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Home & Garden",
    children: [
      {
        id: "4-1",
        name: "Furniture",
        children: [
          { id: "4-1-1", name: "Sofas" },
          { id: "4-1-2", name: "Tables" },
        ],
      },
      {
        id: "4-2",
        name: "Kitchenware",
        children: [
          { id: "4-2-1", name: "Cookware" },
          { id: "4-2-2", name: "Utensils" },
        ],
      },
    ],
  },
];

export default categories;
