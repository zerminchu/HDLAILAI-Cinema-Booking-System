import {  Box, useMantineTheme } from "@mantine/core";
import { faCouch, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SeatMap({ seats=null, updateSeats }) {
    const theme = useMantineTheme();
  return seats ? (
    <Box mt={theme.spacing.md}>
      {seats.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((seat, colIndex) => (
            <FontAwesomeIcon
              icon={seat.isBlocked ? faCheckSquare : faCouch}
              key={`${seat.rowId}-${seat.columnId}`}
              name={`${seat.rowId}-${seat.columnId}`}
              style={{
                display: "inline-block",
                width: 20,
                height: 20,
                margin: 2,
                //backgroundColor: seat.isBlocked ? "gray" : "green",
              }}
              onClick={() => updateSeats(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </Box>
  ) : (
    <></>
  );
}

export default SeatMap;
