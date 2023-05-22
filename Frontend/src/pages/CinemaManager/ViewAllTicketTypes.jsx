import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import TicketTypesTable from "./Components/ViewAllTicketTypes/TicketTypesTable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextInput,
  Group,
  Space,
  Loader,
  Text,
  Divider,
  Pagination,
} from "@mantine/core";
import "./Components/ViewMovie/SearchMovie.css";

function ViewAllTicketTypes() {
  // State to store data
  const [ticketTypes, setTicketTypes] = useState([]);
  const [isAllTicketTypes, setIsAllTicketTypes] = useState(true);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

  useEffect(() => {
    // Load data from backend API
    axios.get("http://localhost:8080/viewtickettype/all").then((response) => {
      // Store data into react state
      console.log(response);
      setTicketTypes(response.data);
      setIsLoading(false);
    });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setPerPage(10); // Update perPage value to 10
  };

  const indexOfLastTT = currentPage * perPage;
  const indexOfFirstTT = indexOfLastTT - perPage;
  const currentTicketTypes = ticketTypes.slice(indexOfFirstTT, indexOfLastTT);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>Ticket Types</h1>
      <Space h="lg" />
      <Divider my="sm" size="sm" />
      <form onSubmit={search}>
        <Group>
          <TextInput
            value={query}
            name={"query"}
            placeholder="Search for Ticket Types"
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="search-bar"
          />
          <Button type="submit" variant="light" color="blue">
            Search
          </Button>
        </Group>
      </form>
      <Button
        component={Link}
        to="/AddTicketType"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Add New
      </Button>
      <Space h="lg" />
      {ticketTypes.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No Ticket Types found
        </Text>
      ) : (
        ticketTypes && <TicketTypesTable ticketTypes={currentTicketTypes} />
      )}

      <Pagination
        style={{ justifyContent: "center", marginTop: 20 }}
        limit={perPage}
        page={currentPage}
        onChange={handlePageChange}
        total={Math.ceil(ticketTypes.length / perPage)}
      />
    </div>
  );
}

export default ViewAllTicketTypes;
