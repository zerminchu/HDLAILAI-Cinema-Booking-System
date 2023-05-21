import { useState } from "react";
import axios from "axios";
import SummaryTable from "./Components/SummaryTable";
import WeekCalendar from "./WeekCalendar";
import { Button } from "@mantine/core";

export default function WeekTicketSales() {
  // Array of 2 elements, startOfWeek and endOfWeek
  const [week, setWeek] = useState([]);
  const [data, setData] = useState([]);
  // nvr touch
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8080/viewreport/ticket/weekly",
        {
          params: {
            startDateTime: week[0],
            endDateTime: week[1],
          },
        }
      );
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
      <WeekCalendar value={week} setValue={setWeek} setWeek={setWeek} />

      <Button className="msBtn" type="submit" onClick={handleSubmit}>
        Generate
      </Button>
      {data.length === 0 ? <></> : <SummaryTable data={data} />}
    </>
  );
}
