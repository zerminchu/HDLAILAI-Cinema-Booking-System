import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import { useEffect, useState } from "react";
import {
  Button,
  Group,
  Text,
  TextInput,
  Pagination,
  Space,
  Divider,
} from "@mantine/core";
import HallTable from "./Components/ViewHalls/HallTable";
import axios from "axios";
import CMCreateHallModel from "./CMCreateHallModel";
import "./Components/ViewHalls/SearchHall.css";

function CinemaManagerHome() {
  const [isAllHall, setIsAllHall] = useState(true);
  const [halls, setHalls] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  function search(event) {
    event.preventDefault();
    console.log(query);
    axios
      .get(`http://localhost:8080/searchhall?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setHalls(response.data);
        setIsAllHall(true);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/viewhall/all`)
      .then((response) => {
        setHalls(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastHall = currentPage * perPage;
  const indexOfFirstHall = indexOfLastHall - perPage;
  const currentHalls = halls.slice(indexOfFirstHall, indexOfLastHall);

  return (
    <div>
      <h1>Halls</h1>
      <Space h="lg" />
      <Divider my="sm" size="sm" />
      <form onSubmit={search}>
        <Group>
          <TextInput
            value={query}
            name={"query"}
            placeholder="Search for halls"
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="search-bar"
          />
          <Button type="submit" variant="light" color="blue">
            Search
          </Button>
        </Group>
      </form>
      <CMCreateHallModel />

      {halls.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No halls found
        </Text>
      ) : (
        <>
          <HallTable
            halls={
              isAllHall
                ? currentHalls
                : currentHalls.filter((hall) => hall.name === filterValue)
            }
          />
          <Pagination
            style={{ justifyContent: "center", marginTop: 20 }}
            limit={perPage}
            page={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(halls.length / perPage)}
          />
        </>
      )}
    </div>
  );
}

export default CinemaManagerHome;
