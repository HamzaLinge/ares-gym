export interface ICategoryTree {
  _id: string;
  name: string;
  description?: string;
  children?: ICategoryTree[];
}
