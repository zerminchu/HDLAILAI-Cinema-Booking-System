import CinemaManagerHeader from "./CinemaManagerHeader";
import { useEffect, useState } from "react";
import { Button, Group, Select, MultiSelect} from '@mantine/core';
import HallTable from "./HallTable";
import axios from "axios";
import CMCreateRoomModel from "../CinemaManagerCreateRoom/CMCreateRoomModel";

const CinemaManagerHome = () => {

  const [filterValue, setFilterValue] = useState (null);
  const [isAllHall, setIsAllHall] = useState (null);
  const [halls, setHalls] = useState ([]);

  useEffect(() => {
      axios
      .get(`http://localhost:8080/viewhall/all`)
      .then(response => {
          setHalls(response.data);
          setIsAllHall(true);
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
      <CMCreateRoomModel />
        <Select
          data={['All Hall', ...halls.map(hall => hall.name)]}
          placeholder="Select Hall"
          onChange={(e) => {
            if (e !== 'All Hall') {
              setFilterValue(e);
              setIsAllHall(false);
            } else {
              setIsAllHall(true)
            }}}
          />
       
      </Group>
      {console.log(filterValue)}
      {halls && !isAllHall && <HallTable halls={halls.filter((hall) => hall.name === filterValue)}/>}
      {console.log("Ran")}
      {halls && isAllHall && <HallTable halls={halls}/>}
    </div>
  )
}

export default CinemaManagerHome;



/* useEffect(() => {
  fetch("http://localhost:8000/halls")
  .then(response => {
    if (!response.ok){
      throw Error ('could not fetch the data for the resource')
    }
    return response.json();
  })
  .then ((data) => {
    setHalls(data);
    setIsAllHall(true);
  })
  .catch((error) => console.log(error));
}, []); */


{/* <MultiSelect 
value={["All Hall", ...halls.map(hall => hall.hallName)]} 
onChange={(e) => {
  if (e !== 'All Hall') {
    setFilterValue(e);
    setIsAllHall(false);
  } else {
    setIsAllHall(true)
  }}} 
data={[]} /> */}
{/*  */}