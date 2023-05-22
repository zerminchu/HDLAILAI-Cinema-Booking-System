import { useState, useRef, useEffect } from "react";
import axios from "axios";
import SummaryTable from "./Components/SummaryTable";
import { ActionIcon, Button, Center, Flex } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
export default function HourTicketSales() {
  const [date, setDate] = useState(new Date());
  const ref = useRef();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const et = new Date(
      `${date.getFullYear()} ${
        date.getMonth() + 1
      } ${date.getDate()} ${startTime}`
    );

    et.setHours(et.getHours() + 1);

    setEndTime(
      et.toLocaleTimeString("en-SG", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [startTime]);
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const st = new Date(
        `${date.getFullYear()} ${
          date.getMonth() + 1
        } ${date.getDate()} ${startTime}`
      );
      console.log(st);
      let et = new Date(st);
      et.setHours(st.getHours() + 1);
      console.log(st);
      console.log(et);
      const response = await axios.get(
        "http://localhost:8080/viewreport/ticket/hourly",
        {
          params: {
            startDateTime: st,
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
          <TimeInput
            className="startTimeField"
            rightSection={
              <ActionIcon onClick={() => ref.current.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            label="From"
            value={startTime}
            ref={ref}
            onChange={(event) => setStartTime(event.target.value)}
          />
          <TimeInput
            className="endTimeField"
            placeholder="What time does it end"
            label="To"
            value={endTime}
            readOnly
          />
          <Button className="msBtn" type="submit" onClick={handleSubmit}>
            Generate
          </Button>{" "}
        </Flex>
      </Center>
      {data.length === 0 ? <></> : <SummaryTable data={data} />}
    </>
  );
}
