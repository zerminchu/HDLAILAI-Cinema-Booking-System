import { useState } from "react";
import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Grid,
  Textarea,
} from "@mantine/core";
// import axios from "axios";
import "../CinemaManager/Components/ViewMovie/MovieStyle.css";

function UpdateMovieSession() {
  const { id } = useParams();
  const [movieName, setMovieName] = useState("");
  const [movieOptions, setMovieOptions] = useState([]);
  const [movieId, setMovieId] = useState("");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userProfileId, setUserProfileId] = useState(-1);
  // const [profileOptions, setProfileOptions] = useState([]);

  // // Load user profiles
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/createuserprofile/all")
  //     .then(({ data }) => {
  //       if (data) {
  //         const options = data.map((profile) => {
  //           return { value: profile.id, label: profile.profileName };
  //         });
  //         setProfileOptions([...options]);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // function handleSubmit(event) {
  //   // Prevent submit from refreshing the page
  //   event.preventDefault();
  //   console.log(userProfileId);
  //   // handle submit here
  //   axios
  //     .post("http://localhost:8080/login", {
  //       userProfile: { id: userProfileId },
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => {
  //       alert(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(error.response.data);
  //     });
  // }

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
      <Button className="msBtn" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default UpdateMovieSession;
