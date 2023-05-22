import { useEffect, useState, useRef } from "react";
import { TextInput, Button, Select, Text } from "@mantine/core";
import { DateTimePicker, DatePickerInput, TimeInput } from "@mantine/dates";
import axios from "axios";
import { IconClock } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useLocation, useNavigate } from "react-router-dom";
function UpdateMovieSession({
  hallId = -1,
  movieId = -1,
  endDateTime = "",
  startDateTime = "",
}) {
  const location = useLocation();
  const route = useNavigate();
  const data = location.state;

  console.log(data);
  const bufferTimeInMinutes = 60;
  const startTimeRef = useRef(new Date().getTime());
  const [date, setDate] = useState(new Date(data.startDateTime));
  const [hall, setHall] = useState({ id: data.hallId });
  const [movie, setMovie] = useState({ id: data.movieId });
  const [hallOptions, setHallOptions] = useState([{ value: "", label: "" }]);
  const [movieOptions, setMovieOptions] = useState([{ value: "", label: "" }]);
  const [startTime, setStartTime] = useState(
    new Date(data.startDateTime).toLocaleTimeString("en-SG", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [endTime, setEndTime] = useState(
    new Date(data.endDateTime).toLocaleTimeString("en-SG", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [error, setError] = useState("");

  useEffect(() => {
    async function getFieldData() {
      try {
        const hallResponse = await axios.get(
          "http://localhost:8080/viewhall/all"
        );
        const movieResponse = await axios.get(
          "http://localhost:8080/viewmovie/all"
        );
        if (hallResponse.data && hallResponse.data.length > 0) {
          setHallOptions(
            hallResponse.data.map((hall) => ({
              value: hall,
              label: hall.name,
            }))
          );
        }
        if (movieResponse.data && movieResponse.data.length > 0) {
          setMovieOptions(
            movieResponse.data.map((movie) => ({
              value: movie,
              label: movie.title,
            }))
          );
          setMovie(
            movieResponse.data.find((movie) => movie.id == data.movieId)
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    getFieldData();
  }, []);

  useEffect(() => {
    console.log(startTime);
    if (!startTime) {
      return;
    }
    const et = new Date(
      `${date.getFullYear()} ${
        date.getMonth() + 1
      } ${date.getDate()} ${startTime}`
    );
    console.log(movie);
    console.log(et);

    if (movie?.runTime) {
      et.setMinutes(et.getMinutes() + movie?.runTime + bufferTimeInMinutes);
    }
    console.log(et);
    if (et)
      setEndTime(
        et.toLocaleTimeString("en-SG", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
  }, [movie, date, startTime]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!startTime) {
      return notifications.show({
        title: "Error updating Movie Session",
        message: "Invalid start time",
        autoClose: 3000,
      });
    }
    axios
      .put(`http://localhost:8080/updatemoviesession/${data.id}`, {
        id: data.id,
        movieId: movie.id,
        suspended: data.suspended,
        hallId: hall.id,
        startDateTime: new Date(
          `${date.getFullYear()} ${
            date.getMonth() + 1
          } ${date.getDate()} ${startTime}`
        ),
        endDateTime: new Date(
          `${date.getFullYear()} ${
            date.getMonth() + 1
          } ${date.getDate()} ${endTime}`
        ),
      })
      .then(() => {
        notifications.show({
          title: `Movie Session`,
          message: "Movie Session updated successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error updating Movie Session",
          message: error.response.data,
          autoClose: 3000,
        });
      });
    route(`/ViewHall/${hall.id}`);
  }

  return (
    <form className="CMCreateMS">
      <div>
        <h1>Update Movie Session</h1>
        <DatePickerInput
          className="DateField"
          mt="md"
          popoverProps={{ withinPortal: true }}
          placeholder="When is it avaliable?"
          label="Movie Session Date"
          clearable={false}
          minDate={new Date()}
          value={date}
          onChange={(event) => {
            console.log(event);
            setDate(event);
          }}
          required
        />
        {!hallId && (
          <Select
            className="movieNameField"
            label="Hall"
            /* placeholder={Movie Name} */
            data={hallOptions}
            value={hall}
            onChange={setHall}
            withAsterisk
          />
        )}
        <Select
          className="movieNameField"
          label="Movie"
          /* placeholder={Movie Name} */
          data={movieOptions}
          value={movie}
          onChange={setMovie}
          withAsterisk
        />
        <TimeInput
          className="startTimeField"
          placeholder="What time does it start"
          rightSection={
            <ActionIcon onClick={() => startTimeRef.current.showPicker()}>
              <IconClock size="1rem" stroke={1.5} />
            </ActionIcon>
          }
          label="Start Time"
          minDate={new Date()}
          value={startTime}
          ref={startTimeRef}
          onChange={(event) => setStartTime(event.target.value)}
        />
        <TimeInput
          className="endTimeField"
          placeholder="What time does it end"
          label="Calculated End Time"
          value={endTime}
          disabled
        />
      </div>
      <Button className="msBtn" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default UpdateMovieSession;
