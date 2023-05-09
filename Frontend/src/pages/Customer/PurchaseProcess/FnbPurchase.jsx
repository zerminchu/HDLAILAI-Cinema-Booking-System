import {
    TextInput,
    NumberInput,
    Button,
    Container,
    Grid,
    Tabs,
    Group,
  } from "@mantine/core";
 
  import FnbCart from "./FnbCart";
  import { useEffect, useState } from "react";
  import { useLocation, useParams, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { notifications } from "@mantine/notifications";
  import { useForm } from "@mantine/form";

 
  function FnbPurchase() {
    const { id } = useParams();
    //display the first tab food when load in
    const [activeTab, setActiveTab] = useState("Food");

    //food
    const [food, setFood] = useState([]);

    //drink
    const [drink, setDrink] = useState([]);

    //Shopping Cart
    const [cart, setCart] = useState([]);
    
    async function getFoodAndDrink(id) {
      try {
        const fnbResponse = await axios.get(
          //no location
          `http://localhost:8080/viewfnb/all`
        );
        const loadedFnb = fnbResponse.data;

        //Push Food and Drink
        let newFood = [];
        let newDrink = []
        
        newFood.push(loadedFnb.filter((Fnb) => Fnb.type === "food"));
        newDrink.push(loadedFnb.filter((Fnb) => Fnb.type === "drink"));
      
        setFood(newFood);
        setDrink(newDrink);
        console.log(id);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getFoodAndDrink(id);
    }, []);

    /*
    const form = useForm({
      initialValues: {
        name: hallNaming,
      },
  
      validate: {
        name: (value) => {
          if (value.length === 0) return "Profile name is empty.";
          if (/^\s*$|^\s+.*|.*\s+$/.test(value))
            return "Profile name contains trailing/leading whitespaces";
          return null;
        },
      },
    });
  
    useEffect(() => {
      getHallAndSeats(id);
    }, []);
  
    useEffect(() => {
      form.setValues({ name: hallNaming });
    }, [hallNaming]);
  
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
          setSeatIsUpdating();
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
    */

  
    return (
       (
        <div>
          
          {/*Tab Part*/}
          <Group>
          <Container>
            <Tabs
              defaultValue={activeTab}
              value={activeTab}
              onTabChange={setActiveTab}
            >
              <Tabs.List>
                <Tabs.Tab value="Food">Food</Tabs.Tab>
                <Tabs.Tab value="Drink">Beverage</Tabs.Tab>
              </Tabs.List>
              
              {/*Food Tab*/}
              <Tabs.Panel value="Food" pt="xs">
                {/*View Fnb Page*/}
                <CinemaManagerFNB newItem ={food} />
              </Tabs.Panel>

              {/*Drink Tab*/}
              <Tabs.Panel value="Drink" pt="xs">
                {/*View Fnb Page*/}
                <CinemaManagerFNB newItem ={drink} />
              </Tabs.Panel>
            </Tabs>
          </Container>
          </Group>

          {/*Shopping cart Part*/}
          <Group>
            <FnbCart data={cart} setData={setCart} />
          </Group>

          {/*Submit Button*/}
          <Group>
          <div className="submitBtn">
          <Button type="submit">Submit</Button>
          </div>
          </Group>
        </div>
        

      )
    );
  
       }

  export default FnbPurchase;
      