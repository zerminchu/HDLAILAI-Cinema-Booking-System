import { Button, Container, Select, Tabs } from "@mantine/core";
import "./OwnerStyle.css";
import HourFnbSales from "./HourFnBSales.jsx";
import WeekFnbSales from "./WeekFnBSales.jsx";
import DayFnbSales from "./DayFnBSales.jsx";

export default function FnbReport() {
  return (
    <Container>
      <h1>FnB Sales</h1>
      <Tabs defaultValue="Hourly">
        <Tabs.List position="center">
          <Tabs.Tab value="Hourly">Hourly</Tabs.Tab>
          <Tabs.Tab value="Daily">Daily</Tabs.Tab>
          <Tabs.Tab value="Weekly">Weekly</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Hourly" pt="xs">
          <HourFnbSales />
        </Tabs.Panel>

        <Tabs.Panel value="Daily" pt="xs">
          <DayFnbSales />
        </Tabs.Panel>

        <Tabs.Panel value="Weekly" pt="xs">
          <WeekFnbSales />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
