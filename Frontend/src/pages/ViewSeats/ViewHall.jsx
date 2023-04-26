// import { useEffect, useState } from "react";
import { TextInput, NumberInput, Button, Container, Grid } from "@mantine/core";
// import axios from "axios";
import "./ViewHallStyle.css";
import { MdChair } from "react-icons/md";
import SeatMap from "../SeatMap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";

function ViewHall() {
  const { id } = useParams();
  const [hall, setHall] = useState(null);
  const [totalRow, setTotalRow] = useState(0);
  const [totalCol, setTotalCol] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [seats2D, setSeats2D] = useState([]);

  async function getHallAndSeats(id) {
    try {
      const hallResponse = await axios.get(
        `http://localhost:8080/viewhall/${id}`
      );
      const loadedHall = hallResponse.data;
      const seatResponse = await axios.get(
        `http://localhost:8080/viewseat/all/${id}`
      );
      const loadedSeats = seatResponse.data;
      let newSeats = [];
      while (loadedSeats.length && loadedHall.totalColumn)
        newSeats.push(loadedSeats.splice(0, loadedHall.totalColumn));
      setHall(loadedHall);
      setTotalCol(loadedHall.totalColumn);
      setTotalRow(loadedHall.totalRow);
      setSeats2D(newSeats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHallAndSeats(id);
  }, []);

  function handleSuspend(id) {
    axios
      .delete(`http://localhost:8080/suspendseat/${id}`, {
        blocked: true,
      })
      .then(() => {
        setSeats2D(
          seats2D.map((seats1D) => {
            return seats1D.map((seat) =>
              seat.id === id ? { ...seat, blocked: true } : seat
            );
          })
        );
      })
      .catch((error) => console.log(error));
  }

  function handleUnsuspend(id) {
    axios
      .put(`http://localhost:8080/suspendseat/unsuspend/${id}`, {
        blocked: false,
      })
      .then(() => {
        setSeats2D(
          seats2D.map((seats1D) => {
            return seats1D.map((seat) =>
              seat.id === id ? { ...seat, blocked: false } : seat
            );
          })
        );
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateSeats() {
    const seatsToSave = [];
    seats2D.forEach((row) => {
      row.forEach((seat) => {
        const { rowId: seatRowId, columnId: seatColumnId, isBlocked } = seat;
        const newSeat = {
          rowId: seatRowId,
          columnId: seatColumnId,
          blocked: isBlocked,
          hallId: id,
        };
        seatsToSave.push(newSeat);
      });
    });

    let newSeats = [];
    const totalSeats = [];
    for (let i = 1; i <= totalRow; i++) {
      for (let j = 1; j <= totalCol; j++) {
        let existingSeat = seatsToSave.find(
          (seat) => seat.rowId === i && seat.columnId === j
        );
        if (!existingSeat) {
          newSeats.push({ rowId: i, columnId: j, blocked: false, hallId: id });
          totalSeats.push({
            rowId: i,
            columnId: j,
            blocked: false,
            hallId: id,
          });
        } else {
          totalSeats.push(existingSeat);
        }
      }
    }
    const updatedHall = {
      id,
      totalRow,
      totalColumn: totalCol,
    };

    console.log(newSeats);
    axios
      .post(`http://localhost:8080/createseat/addAll`, {
        seats: newSeats,
        hall: updatedHall,
      })
      .then(() => {
        /* const newSeats2D = [];
        console.log(newSeats);
        console.log(updatedHall);
        while (totalSeats.length)
          newSeats2D.push(totalSeats.splice(0, updatedHall.totalColumn));
        setSeats2D(newSeats2D);
        setHall((prevHall) => ({ ...prevHall, ...updatedHall }));
        setTotalCol(updatedHall.totalColumn);
        setTotalRow(updatedHall.totalRow); */
        // Ask teacher
        getHallAndSeats(id);
        notifications.show({
          title: "Seats saved",
          message: "Seat data saved successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Error saving seats",
          autoClose: 3000,
        });
      });
  }

  return (
    hall && (
      <form className="loginForm">
        <div>
          <Container my="md">
            <Grid>
              <Grid.Col xs={6}>
                <TextInput
                  className="hallNameField"
                  label="Hall Name"
                  value={hall.name}
                  disabled
                />
              </Grid.Col>
              <Grid.Col xs={2}></Grid.Col>
              <Grid.Col xs={8}>
                <Button className="editBtn">Edit</Button>
              </Grid.Col>
              <Grid.Col xs={12}></Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  defaultValue={0}
                  className="rowsField"
                  min={hall.totalRow}
                  value={totalRow}
                  onChange={setTotalRow}
                  label="No. of Rows"
                  disabled={!isUpdating}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  defaultValue={0}
                  min={hall.totalColumn}
                  value={totalCol}
                  onChange={setTotalCol}
                  label="No. of Columns"
                  placeholder=""
                  disabled={!isUpdating}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                {isUpdating ? (
                  <Button
                    className="submitBtn"
                    onClick={() => handleUpdateSeats()}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    className="updateBtn"
                    onClick={() => setIsUpdating(!isUpdating)}
                  >
                    Update
                  </Button>
                )}
              </Grid.Col>
              <Grid.Col xs={12}>
                <ul className="showcase">
                  <li>
                    <div className="seatSelected">
                      <MdChair style={{ color: "228BE6" }} />
                    </div>
                    <small>Selected</small>
                  </li>
                  <li>
                    <div className="seatAvailable">
                      <MdChair style={{ color: "868E96" }} />
                    </div>
                    <small>Available</small>
                  </li>
                  <li>
                    <div className="seatOccupied">
                      <MdChair style={{ color: "F03E3E" }} />
                    </div>
                    <small>Occupied</small>
                  </li>
                  <li>
                    <div className="seatUnavailable">
                      <MdChair style={{ color: "2C2E33" }} />
                    </div>
                    <small>Unavailable</small>
                  </li>
                </ul>
              </Grid.Col>
              {/* <Grid.Col xs={4}></Grid.Col> */}
              <Grid.Col xs={12}>
                <div className="screen">
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Screen
                  </span>
                </div>
              </Grid.Col>
              {/*  <Grid.Col xs={4}></Grid.Col> */}
            </Grid>
          </Container>
        </div>
        <SeatMap
          seats={seats2D}
          unsuspend={handleUnsuspend}
          updateSeats={handleSuspend}
        />
      </form>
    )
  );
}

export default ViewHall;
