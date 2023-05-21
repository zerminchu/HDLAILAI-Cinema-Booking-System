import { useEffect, useState } from "react";
import { Button, Container, Select, Tabs } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import logo from "./Components/logo-no-background.png";
import "./OwnerStyle.css";
import WeekCalendar from "./WeekCalendar";
import WeekTicketSales from "./WeekTicketSales";
import HourTicketSales from "./HourTicketSales";
import DayTicketSales from "./DayTicketSales";

function TicketReport() {
  const [activeTab, setActiveTab] = useState("Hourly");
  return (
    <Container>
      <h1>Ticket Sales</h1>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List position="center">
          <Tabs.Tab value="Hourly">Hourly</Tabs.Tab>
          <Tabs.Tab value="Daily">Daily</Tabs.Tab>
          <Tabs.Tab value="Weekly">Weekly</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Hourly" pt="xs">
          <HourTicketSales />
        </Tabs.Panel>
        <Tabs.Panel value="Daily" pt="xs">
          <DayTicketSales />
        </Tabs.Panel>
        <Tabs.Panel value="Weekly" pt="xs">
          <WeekTicketSales />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default TicketReport;
