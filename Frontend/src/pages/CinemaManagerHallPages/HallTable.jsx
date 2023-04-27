import { Table, Group, Button, Text, Switch, useMantineTheme} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const HallTable = (props) => {

    const theme = useMantineTheme();
    const [halls, setHalls] = useState (props.halls);
    const [isChanged, setIsChanged] = useState (true);

    useEffect(() => {
      setHalls(props.halls);
    }, [props.halls]);  

    const handleStatus = (id, checkOrNot) => { 
   
      setIsChanged(!isChanged) 
      console.log(isChanged)

        //const updateHall = {status: checkOrNot};

        /*axios.
          post(`http://localhost:8080/updatehallstatus/${id}`, updateHall)
          .then ((response) => {
            console.log(response.data);

            axios.
                get(`http://localhost:8080/halls/all`)
                .then ((response) => setHalls(response.data))
                .catch((error) => console.log(error));
          }) */
      

       for (const h of halls){
        if (h.id === id){
           h.status = checkOrNot;
          console.log (h.id, h.status);
        }
      } 
    }

    const rows = halls.map(
        (hall) =>
          hall && (
            <tr key={hall.id}>
              <td>
                <div style={{ textAlign: "left" }}>
                  <Text>{hall.hallName}</Text>
                </div>
              </td>
    
              <td>
              <Group >
                  <Switch
                    checked={hall.status}
                    onChange={(event) => {
                      console.log(event.currentTarget.checked);
                      handleStatus(hall.id, event.currentTarget.checked);
                    }}
                    color="teal"
                    size="md"
                    label= {hall.status === true ? 'Available':'Not Available'}
                    thumbIcon={
                      hall.status === true ? (
                        <IconCheck size="0.8rem" color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3} />
                      ) : (
                        <IconX size="0.8rem" color={theme.colors.red[theme.fn.primaryShade()]} stroke={3} />
                      )
                    }
                  />
              </Group>
              </td>
    
              <td>
                <Button>View</Button>
              </td>
            </tr>
          )
      );

    return (
        <Group>
        <Table miw={1200} verticalSpacing="sm" position='left'>
          <thead>
            <tr>
              <th>Hall</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>  
          <tbody>{rows}</tbody>
        </Table>
        </Group>
    );
}

export default HallTable;