import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import FNBTable from "./Components/Fnb/FNBTable";
import { useEffect, useState } from "react";
import { Button, Group, TextInput, Text, Space, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";

const CinemaManagerFNB = () => {
  const [fnbs, setFnbs] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/searchfnb?q=${query}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setFnbs(response.data);
  //       console.log(query);
  //     })
  //     .catch((error) => console.log(error));
  // }, [query]);

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
        //setIsSearching(false);
        //console.log(isSearching);
      })
      .catch((error) => console.log(error));
  }, []);

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

      {fnbs && <FNBTable fnbs={fnbs} />}
      {fnbs.length === 0 && (
        <Text fw={600} style={{ textAlign: "center", margin: "30px" }}>
          No Items found
        </Text>
      )}
    </div>
  );
};

export default CinemaManagerFNB;
