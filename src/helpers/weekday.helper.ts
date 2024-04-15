import { weekdays } from "../config/constants/weekdays";

export const getWeekday = (day_id: string) => {
  return weekdays.find((weekday) => weekday.day_id === parseInt(day_id));
};
