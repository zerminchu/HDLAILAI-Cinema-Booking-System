import { useState } from "react";
import { Group } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";

function getDay(date) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function startOfWeek(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - getDay(date) - 1
  );
}

function endOfWeek(date) {
  return dayjs(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (6 - getDay(date))
    )
  )
    .endOf("date")
    .toDate();
}

function isInWeekRange(date, value) {
  return (
    value &&
    dayjs(date).isBefore(endOfWeek(value)) &&
    dayjs(date).isAfter(startOfWeek(value))
  );
}

function WeekCalendar({ setWeek }) {
  const [hovered, setHovered] = useState(null);
  const [value, setValue] = useState(new Date());
  return (
    <Calendar
      withCellSpacing={false}
      getDayProps={(date) => {
        const isHovered = isInWeekRange(date, hovered);
        const isSelected = isInWeekRange(date, value);
        const isInRange = isHovered || isSelected;
        return {
          onMouseEnter: () => setHovered(date),
          onMouseLeave: () => setHovered(null),
          inRange: isInRange,
          firstInRange: isInRange && date.getDay() === 1,
          lastInRange: isInRange && date.getDay() === 0,
          selected: isSelected,
          onClick: () => {
            setValue(date), setWeek([startOfWeek(date), endOfWeek(date)]);
          },
        };
      }}
    />
  );
}

export default WeekCalendar;
