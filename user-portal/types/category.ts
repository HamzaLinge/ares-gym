export interface ICategoryTree {
  _id: string;
  name: string;
  description?: string;
  children?: ICategoryTree[];
}

export type TCategory = {
  _id: string;
  name: string;
  description?: string;
  parent?: string;
};
