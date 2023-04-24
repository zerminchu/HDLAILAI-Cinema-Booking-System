import CinemaManagerNav from "./CinemaManagerNav";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Button
} from '@mantine/core';

const CinemaManagerHome = () => {
  return (
    <div>
      <div>
        <CinemaManagerNav />
      </div>
      <div>
        <Button>Create Hall</Button>
      </div>
    </div>
  )
}
export default CinemaManagerHome;

/*
    <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>  
              <th>Employee</th>
              <th>Job title</th>
              <th>Email</th>
              <th>Phone</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
    </ScrollArea>
    */