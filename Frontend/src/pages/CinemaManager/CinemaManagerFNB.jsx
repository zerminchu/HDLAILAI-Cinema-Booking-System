import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import FNBTable from "./Components/Fnb/FNBTable";
import { useEffect, useState } from "react";
import {
  Button,
  Group,
  TextInput,
  Text,
  Space,
  Divider,
  Pagination,
} from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";

const CinemaManagerFNB = () => {
  const [fnbs, setFnbs] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  function search(event) {
    event.preventDefault();
    console.log(query);
    axios
      .get(`http://localhost:8080/searchfnb?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setFnbs(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/viewfnb/all`)
      .then((response) => {
        setFnbs(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setPerPage(10); // Update perPage value to 10
  };

  const indexOfLastFnb = currentPage * perPage;
  const indexOfFirstFnb = indexOfLastFnb - perPage;
  const currentFnb = fnbs.slice(indexOfFirstFnb, indexOfLastFnb);

  return (
    <div>
      <h1>Food & Beverages</h1>
      <Space h="lg" />
      <Divider my="sm" size="sm" />
      <form onSubmit={search}>
        <Group>
          <TextInput
            value={query}
            name={"query"}
            placeholder="Search for item"
            onChange={(event) => {
              if (event.target.value === "") {
                setIsSearching(false);
                setQuery("");
              } else {
                setIsSearching(true);
                setQuery(event.target.value);
              }
            }}
            className="search-bar"
          />
          <Button type="submit" variant="light" color="blue">
            Search
          </Button>
        </Group>
      </form>
      <Button
        component={Link}
        to={`/CinemaManagerFNBAdd/`}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Add Item
      </Button>

      {fnbs && <FNBTable fnbs={currentFnb} />}
      {fnbs.length === 0 && (
        <Text fw={600} style={{ textAlign: "center", margin: "30px" }}>
          No Items found
        </Text>
      )}
      <Pagination
        style={{ justifyContent: "center", marginTop: 20 }}
        limit={perPage}
        page={currentPage}
        onChange={handlePageChange}
        total={Math.ceil(fnbs.length / perPage)}
      />
    </div>
  );
};

export default CinemaManagerFNB;
