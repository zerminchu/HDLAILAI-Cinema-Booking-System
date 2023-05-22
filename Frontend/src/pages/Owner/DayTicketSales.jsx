import { useState } from "react";
import axios from "axios";
import SummaryTable from "./Components/SummaryTable";
import WeekCalendar from "./WeekCalendar";
import { ActionIcon, Button, Center, Flex } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
export default function DayTicketSales() {
  // Array of 2 elements, startOfWeek and endOfWeek
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  // nvr touch
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log(date);
      const st = new Date(
        `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()}`
      );
      const et = new Date(
        `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()}`
      );
      et.setDate(date.getDate() + 1);
      console.log(et);
      const response = await axios.get(
        "http://localhost:8080/viewreport/ticket/daily",
        {
          params: {
            startDateTime: date,
            endDateTime: et,
          },
        }
      );
      if (response.data.length === 0) {
        notifications.show({
          title: "No data available",
          message: "No sales were made during this period",
          autoClose: 3000,
        });
      }
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error generating report",
        message: error.response.data,
        autoClose: 3000,
      });
    }
  }
  return (
    <>
      <Center>
        <Flex direction="column">
          <DatePicker value={date} onChange={setDate} />
          <Button className="msBtn" type="submit" onClick={handleSubmit}>
            Generate
          </Button>{" "}
        </Flex>
      </Center>
      {data.length === 0 ? <></> : <SummaryTable data={data} />}
    </>
  );
}
