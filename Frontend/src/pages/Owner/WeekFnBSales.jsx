import { useState } from "react";
import axios from "axios";
import SummaryTable from "./Components/SummaryTable";
import WeekCalendar from "./WeekCalendar";
import { Button, Center, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
export default function WeekFnbSales() {
  // Array of 2 elements, startOfWeek and endOfWeek
  const [week, setWeek] = useState([]);
  const [data, setData] = useState([]);
  // nvr touch
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8080/viewreport/fnb/weekly",
        {
          params: {
            startDateTime: week[0],
            endDateTime: week[1],
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
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error generating report",
        message: error.response.data,
        autoClose: 3000,
      });
    }
  }

  /*  useEffect(() => {
      data.reduce((prevValue, nextValue)=> {}, {totalRevenueEarned: 0, });
    }, [data]); */
  return (
    <>
      <Center>
        <Flex direction="column">
          <WeekCalendar value={week} setValue={setWeek} setWeek={setWeek} />
          <Button className="msBtn" type="submit" onClick={handleSubmit}>
            Generate
          </Button>{" "}
        </Flex>
      </Center>
      {data.length === 0 ? <></> : <SummaryTable data={data} />}
    </>
  );
}
