import "./Deadline.css";
import { formatDate } from "../../../../../utils/formatDate";

export const Deadline = ({ date }) => {
  const currentDate = new Date();

  // Функция для определения класса в зависимости от даты
  const getClassByDate = (date) => {
    const formattedDate = new Date(date);
    const timeDifference = formattedDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 3) {
      return "three-days-left";
    } else if (daysDifference === 2) {
      return "two-days-left";
    } else if (daysDifference === 1) {
      return "one-days-left";
    } else if (
      daysDifference === 0 &&
      formattedDate.toDateString() === currentDate.toDateString()
    ) {
      return "current-date";
    } else {
      return "";
    }
  };

  const deadlineClass = getClassByDate(date);

  return <td className={deadlineClass}>{formatDate(date)}</td>;
};
