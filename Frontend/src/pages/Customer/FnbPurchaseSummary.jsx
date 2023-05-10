import { useEffect, useState } from "react";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";
import FnbSummaryTable from "./Components/FnbSummaryTable";


const FnbPurchaseSummary = () => {
    
    const [fnbOrder, setFnbOrder] = useState(
        {items: [{name: "Popcorn (S)", quantity: 2, price: 620, id:1},
                {name: "Coca Cola", quantity: 2, price: 320, id:2},
                {name: "Popcorn (L)", quantity: 2, price: 860, id:3}], 
                totalPrice: 1800, 
                id:1
        }
    );
  
    return (
    <div>
        <Group>
            <Button /* component={Link} to="" */>
                Back
            </Button>   
        </Group>
        <Group>
            <Text mt="20px" mb="20px" mr="20px" ta="left" fw="500" fz="25px">
               Food & Beverage Items Summary
            </Text>
        </Group>
        <Group>
            <FnbSummaryTable fnbOrder={fnbOrder}/>
        </Group>
        <Group mt="30px" mb="30px" position="right">
            <Text>
                Total Price: 
            </Text>
            <Text>
                $ {fnbOrder.totalPrice / 100}
            </Text>
        </Group>
        <Group position="right">
            <Button component={Link} to="/FnbPurchaseReceipt" >
                Pay Now
            </Button>
        </Group>
    </div>
  );
};

export default FnbPurchaseSummary;
