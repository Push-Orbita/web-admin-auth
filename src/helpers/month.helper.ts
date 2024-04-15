import { months } from "../config/constants/months";

export const getMonth = (month_id: string) => {
  return months.find((month) => month.month_id === parseInt(month_id));
};
