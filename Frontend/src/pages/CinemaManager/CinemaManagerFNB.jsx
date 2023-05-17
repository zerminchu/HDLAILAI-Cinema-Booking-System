import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import FNBTable from "./Components/Fnb/FNBTable";
import { useEffect, useState } from "react";
import { Button, Group, TextInput, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";

const CinemaManagerFNB = () => {
  const [fnbs, setFnbs] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/searchfnb?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setFnbs(response.data);
        console.log(query);
      })
      .catch((error) => console.log(error));
  }, [query]);

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
      <Group>
        <Button component={Link} to={`/CinemaManagerFNBAdd/`}>
          Add Item
        </Button>
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
      </Group>

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
