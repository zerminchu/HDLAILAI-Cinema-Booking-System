import { useEffect, useState } from "react";
import { Button, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import logo from "./Components/logo-no-background.png";
import "./OwnerStyle.css";


function OwnerHome() {
  
  const [DATE, setDate] = useState("");

  //Report Type
  const [reportType, setreportType] = useState("");
  const [reportTypeOptions, setreportTypeOptions] = useState([
    { value: "Ticket Sales", label: "Ticket Sales" },
    { value: "FnB Sales", label: "FnB Sales" },
  ]);

  //Time
  const [time, setTime] = useState("");
  const [timeOptions, settimeOptions] = useState([
    { value: "Hourly", label: "Hourly" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
  ]);
  const [error, setError] = useState("");


  //nvr touch
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

  // nvr touch
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
        setDate("");
        setreportType("");
        setTime("");
      
      })
      .catch((error) => {
        notifications.show({
          title: "Error creating Movie Session",
          message: error.response.data,
          autoClose: 3000,
        });
        setDate("");
        setreportType("");
        setTime("");

      });
  }

  return (
    <form className="OwnerHome">
      <img src={logo} alt="Logo" class="picture" />
      <h1>Cinema Owner Homepage</h1>
      <div>
        <Select
            className="reportField"
            label="Report Type:"
            data={reportTypeOptions}
            value={reportType}
            //not sure if this is correct
            onChange={setreportType}
           
          />
          <br></br>
        <Select
            className="timeField"
            label="Time: "
            data={timeOptions}
            value={time}
            //not sure if this is correct
            onChange={setTime} 
          
          />
        <DatePickerInput
        className="dateField"
        mt="md"
        popoverProps={{ withinPortal: true }}
        placeholder={DATE}
        label="Date:"
        clearable={false}
        onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br><br></br>

      <Button className="msBtn" type ="submit"
      onClick={handleSubmit}>Generate</Button>
    </form>
  );
}

export default OwnerHome;
