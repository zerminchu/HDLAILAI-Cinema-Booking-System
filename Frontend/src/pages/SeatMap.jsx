import { Box, useMantineTheme } from "@mantine/core";
import { faCouch, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdChair } from "react-icons/md";
function SeatMap({ seats = null, unsuspend, updateSeats }) {
  const theme = useMantineTheme();
  return seats ? (
    <Box mt={theme.spacing.xl}>
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} style={{ textAlign: "center" }}>
          {row.map((seat, colIndex) => {
            return (
              <MdChair
                key={`${seat.rowId}-${seat.columnId}`}
                name={`${seat.rowId}-${seat.columnId}`}
                style={{
                  display: "inline-block",
                  width: 50,
                  height: 50,
                  margin: 2,
                  cursor: "pointer",
                  color: seat.blocked ? "black" : "grey",
                }}
                onClick={() =>
                  seat.blocked ? unsuspend(seat.id) : updateSeats(seat.id)
                }
              />
            );
          })}
        </div>
      ))}
    </Box>
  ) : (
    <></>
  );
}

export default SeatMap;
