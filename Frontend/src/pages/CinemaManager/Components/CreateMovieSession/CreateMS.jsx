import { useEffect, useState } from "react";
import { TextInput, Button, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import { notifications } from "@mantine/notifications";

//DATE, MOVIENAME,STARTTIME,ENDTIME

function CreateMS() {
  const [DATE, setDate] = useState("");
  const [movieName, setmovieName] = useState("");
  const [movieOptions, setMovieOptions] = useState([
    { value: "", label: "" },
  ]);
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [error, setError] = useState("");

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/viewhall/all")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHallName();
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/createhall/add", {
        name: name,
      })
      .then(() => {
        notifications.show({
          title: `Movie Session`,
          message: "Movie Session created successfully",
          autoClose: 3000,
        });
        setmovieName("");
        setDate("");
        setstartTime("");
        setendTime("");
      })
      .catch((error) => {
        notifications.show({
          title: "Error creating Movie Session",
          message: error.response.data,
          autoClose: 3000,
        });
        setmovieName("");
        setDate("");
        setstartTime("");
        setendTime("");
      });
  }

  return (
    <form className="CMCreateMS">
      <div>
        <DatePickerInput
        className="DateField"
        mt="md"
        popoverProps={{ withinPortal: true }}
        placeholder="When is it avaliable?"
        label="Movie Session Date"
        clearable={false}
        onChange={(event) => setDate(event.target.value)}
        />
        <Select
            className="movieNameField"
            label="Movie Name"
            placeholder={movieName}
            data={movieOptions}
            value={movieName}
            onChange={(event) => setmovieName(event.target.value)}
            withAsterisk
          />
        <TextInput
          className="startTimeField"
          placeholder="What time does it start"
          label="Start Time:"
          value={startTime}
          onChange={(event) => setstartTime(event.target.value)}
        />
        <TextInput
          className="endTimeField"
          placeholder="What time does it end"
          label="End Time:"
          value={endTime}
          onChange={(event) => setendTime(event.target.value)}
        />
      </div>
      <Button className="msBtn" type ="submit"
      onClick={handleSubmit}>Submit</Button>
    </form>
  );
}

export default CreateMS;
