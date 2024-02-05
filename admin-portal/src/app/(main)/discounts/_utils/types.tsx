export type TDiscount = {
  _id: string;
  title: string;
  percentage: string;
  dateBegin: Date;
  dateEnd: Date;
  description: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
};
