import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import { useEffect, useState } from "react";
import { Button, Group, Text, TextInput } from "@mantine/core";
import HallTable from "./Components/ViewHalls/HallTable";
import axios from "axios";
import CMCreateHallModel from "./CMCreateHallModel";
import "./Components/ViewHalls/SearchHall.css";

const CinemaManagerHome = () => {
  const [isAllHall, setIsAllHall] = useState(true);
  const [halls, setHalls] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/searchhall?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setHalls(response.data);
        setIsAllHall(true);
      })
      .catch((error) => console.log(error));
  }, [query]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/viewhall/all`)
      .then((response) => {
        setHalls(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Group>
        <CinemaManagerHeader />
      </Group>
      <Group>
        <CMCreateHallModel />
        <TextInput
          value={query}
          name={"query"}
          placeholder="Search for halls"
          onChange={(event) => setQuery(event.currentTarget.value)}
          className="search-bar"
        />
      </Group>
      {halls.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No halls found
        </Text>
      ) : (
        <HallTable
          halls={
            isAllHall
              ? halls
              : halls.filter((hall) => hall.name === filterValue)
          }
        />
      )}
      {/*   <Select
        data={["All Hall", ...halls.map((hall) => hall.name)]}
        placeholder="Select Hall"
        onChange={(e) => {
          if (e !== "All Hall") {
            setFilterValue(e);
            setIsAllHall(false);
          } else {
            setIsAllHall(true);
          }
        }}
      /> */}
    </div>
  );
};

export default CinemaManagerHome;
