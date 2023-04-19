import { Button } from '@mantine/core';
import { Link } from "react-router-dom";


function UAHomeButton({ user, setUser}) {
  console.log (user);
  return (
    <Button 
    variant="outline"
    component={Link} 
    to="/EditUserAccount"
    data={user} setData = {setUser}
    >
      Edit
    </Button>
  );
}

export default UAHomeButton;