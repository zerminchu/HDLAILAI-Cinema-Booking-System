import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextInput, Button, Group, Box, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { faCouch, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SeatMap from "./Components/ViewSeats/SeatMap";
function CMCreateSeat() {
  const [totalRow, setTotalRow] = useState(0);
  const [totalColumn, setTotalColumn] = useState(0);
  const [seats, setSeats] = useState([[]]);
  const [halls, setHalls] = useState([]);
  const [currentHallId, setCurrentHallId] = useState(2);
  const theme = useMantineTheme();

  function updateSeats(rowId, colId) {
    const newSeats = [...seats];
    newSeats[rowId][colId].isBlocked = !newSeats[rowId][colId].isBlocked;
    setSeats(newSeats);
  }

  /* useEffect(() => {
    axios
      .get("http://localhost:8080/viewseat/all")
      .then(({ data }) => {
        if (data) {
          setSeats(data);
        }
      })
      .catch((error) => console.log(error));
  }, []); */

  const handleRowsChange = (event) => {
    setTotalRow(event.target.value);
  };

  const handleColsChange = (event) => {
    setTotalColumn(event.target.value);
  };

  const handlePopulateSeats = () => {
    const newSeats = [];
    for (let i = 0; i < totalRow; i++) {
      const row = [];
      for (let j = 0; j < totalColumn; j++) {
        row.push({ rowId: i + 1, columnId: j + 1, isBlocked: false });
      }
      newSeats.push(row);
      console.log(newSeats);
    }
    setSeats(newSeats);
    handleSaveSeats(JSON.parse(JSON.stringify(newSeats)));
  };

  const handleSaveSeats = (seats) => {
    const seatsToSave = [];

    seats.forEach((rowId) => {
      rowId.forEach((seat) => {
        const { rowId, columnId, isBlocked } = seat;
        const newSeat = {
          rowId,
          columnId,
          blocked: isBlocked,
          hallId: currentHallId,
        };
        seatsToSave.push(newSeat);
      });
    });
    console.log(seatsToSave);
    const hall = {
      id: currentHallId,
      totalRow,
      totalColumn,
    };
    axios
      .post("http://localhost:8080/createseat/addAll", {
        seats: seatsToSave,
        hall,
      })
      .then(() => {
        notifications.show({
          title: "Seats saved",
          message: "Seat data saved successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error saving seats",
          autoClose: 3000,
        });
      });
  };

  /*  const handleSaveSeats = (seats) => {
    axios
      .post("http://localhost:8080/createseat/add", {
        rowId: rowId,
        columnId: columnId,
        seats: seats,
        hallId: currentHallId,
      })
      .then((response) => {
        notifications.show({
          title: "Seats added",
          message: `New seats added to hall ${currentHallId}`,
          color: theme.colors.green[6],
          icon: <FontAwesomeIcon icon={faCheckSquare} />,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error",
          message: "Failed to add seats",
          color: theme.colors.red[6],
          icon: <FontAwesomeIcon icon={faCouch} />,
        });
        console.log(error);
      });
  }; */

  return (
    <div>
      <Box m={theme.spacing.xl}>
        <h1>Seat Map</h1>
        <form>
          <TextInput
            label="Rows"
            value={totalRow}
            onChange={handleRowsChange}
            type="number"
            min={0}
          />
          <TextInput
            label="Columns"
            value={totalColumn}
            onChange={handleColsChange}
            type="number"
            min={0}
          />
          <Group position="right" mt={theme.spacing.md}>
            <Button onClick={handlePopulateSeats}>Populate Seats</Button>
          </Group>
          {
            <Group position="right" mt={theme.spacing.md}>
              <Button onClick={handleSaveSeats}>Save Seats</Button>
            </Group>
          }
        </form>
        <SeatMap seats={seats} updateSeats={updateSeats} />
      </Box>
    </div>
  );
}

export default CMCreateSeat;
