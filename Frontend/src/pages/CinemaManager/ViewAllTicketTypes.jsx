import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import TicketTypesTable from "./Components/ViewAllTicketTypes/TicketTypesTable.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, TextInput, Group, Space, Loader, Text } from "@mantine/core";
import "./Components/ViewMovie/SearchMovie.css";

function ViewAllTicketTypes() {
  // State to store data
  const [ticketTypes, setTicketTypes] = useState([]);
  const [isAllTicketTypes, setIsAllTicketTypes] = useState(true);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function search(event) {
    event.preventDefault();
    console.log(query);
    axios
      .get(`http://localhost:8080/searchtickettype?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setTicketTypes(response.data);
        setIsAllTicketTypes(true);
      })
      .catch((error) => console.log(error));
  }

  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/viewtickettype/all")
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setTicketTypes(response.data);
        setIsLoading(false);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <form onSubmit={search}>
        <Group>
          <TextInput
            value={query}
            name={"query"}
            placeholder="Search for Ticket Types"
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="search"
          />
          <Button type="submit" variant="light" color="blue">
            Search
          </Button>
        </Group>
      </form>
      <Space h="lg" />
      <Button component={Link} to="/AddTicketType">
        Add New
      </Button>
      <Space h="lg" />
      {ticketTypes.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No Ticket Types found
        </Text>
      ) : (
        <TicketTypesTable
          ticketTypes={
            isAllTicketTypes
              ? ticketTypes
              : ticketTypes.filter(
                  (ticketType) => ticketType.typeName === filterValue
                )
          }
        />
      )}
    </div>
  );
}

export default ViewAllTicketTypes;
