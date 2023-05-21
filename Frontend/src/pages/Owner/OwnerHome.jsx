import { useEffect, useState } from "react";
import { Button, Select, Tabs } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import logo from "./Components/logo-no-background.png";
import "./OwnerStyle.css";
import WeekCalendar from "./WeekCalendar";
import WeekTicketSales from "./WeekTicketSales";

function OwnerHome() {
  const [DATE, setDate] = useState("");

  //Report Type
  const [reportType, setreportType] = useState("");
  const [reportTypeOptions, setreportTypeOptions] = useState([
    { value: "Ticket Sales", label: "Ticket Sales" },
    { value: "FnB Sales", label: "FnB Sales" },
  ]);

  //Time
  const [time, setTime] = useState("");
  const [timeOptions, settimeOptions] = useState([
    { value: "Hourly", label: "Hourly" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
  ]);
  const [error, setError] = useState("");

  return (
    <form className="OwnerHome">
      <h1>Cinema Owner Homepage</h1>
      <Tabs defaultValue="gallery">
        <Tabs.List position="center">
          <Tabs.Tab value="gallery">Hourly</Tabs.Tab>
          <Tabs.Tab value="messages">Weekly</Tabs.Tab>
          <Tabs.Tab value="settings">Daily</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <DateTimePicker
            className="dateField"
            mt="md"
            popoverProps={{ withinPortal: true }}
            placeholder={DATE}
            label="Date:"
            clearable={false}
            onChange={(event) => setDate(event.target.value)}
          />
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <WeekTicketSales />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <DatePickerInput
            className="dateField"
            mt="md"
            popoverProps={{ withinPortal: true }}
            placeholder={DATE}
            label="Date:"
            clearable={false}
            onChange={(event) => setDate(event.target.value)}
          />
        </Tabs.Panel>
      </Tabs>
      <div></div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </form>
  );
}

export default OwnerHome;
