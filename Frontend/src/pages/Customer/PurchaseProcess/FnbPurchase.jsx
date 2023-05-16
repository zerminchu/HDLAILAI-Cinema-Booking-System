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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import FoodTable from "./FoodTable";
import BeverageTable from "./BeverageTable";

function FnbPurchase() {
  const { id } = useParams();
  //display the first tab food when load in
  const [activeTab, setActiveTab] = useState("Food");
  //food
  const [food, setFood] = useState([]);

  //drink
  const [drink, setDrink] = useState([]);

  //Shopping Cart
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCart, setShowCart] = useState(false); // Track whether to show the cart
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  const updateSelectedItems = (itemId) => {
    const updatedItems = selectedItems.filter((item) => item.id !== itemId);
    setSelectedItems(updatedItems);
  };



  async function getFoodAndDrink(id) {
    try {
      const fnbResponse = await axios.get(`http://localhost:8080/viewfnb/all`);
      const loadedFnb = fnbResponse.data;

      const newFood = loadedFnb.filter((Fnb) => Fnb.type === "Food");
      const newDrink = loadedFnb.filter((Fnb) => Fnb.type === "Beverage");
      setFood(newFood);
      setDrink(newDrink);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFoodAndDrink(id);
  }, []);

  const handleAddToCart = (item) => {
    const itemExists = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
    if (!itemExists) {
      setSelectedItems([...selectedItems, item]);
      setShowCart(true);
      showNotification();
    }
  };

  const showNotification = () => {
    notifications.show({
      title: "Item added to cart",
      message: "You can only add the item once.",
      color: "success",
    });
  };

  const handleSubmit = () => {
    navigate("/fnbsummary", {
      state: {
        selectedItems,
        totalGrossPrice: calculateTotalGrossPrice(selectedItems),
        GST: calculateGST(selectedItems),
        totalNetPrice: calculateTotalNetPrice(selectedItems),
      },
    });
  };

  const calculateTotalGrossPrice = (items) => {
    return items.reduce((total, item) => total + Number(item.currentPrice), 0);
  };

  const calculateGST = (items) => {
    const totalGrossPrice = calculateTotalGrossPrice(items);
    return Math.round(totalGrossPrice * 0.08);
  };

  const calculateTotalNetPrice = (items) => {
    const totalGrossPrice = calculateTotalGrossPrice(items);
    const GST = calculateGST(items);
    return totalGrossPrice + GST;
  };
  return (
    <div>
      {/* Tab Part */}
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
            {/* Food Tab */}
            <Tabs.Panel value="Food" pt="xs">
              {/* View Fnb Page */}
              <FoodTable data={food} onAddToCart={handleAddToCart} />
            </Tabs.Panel>

            {/* Drink Tab */}
            <Tabs.Panel value="Drink" pt="xs">
              {/* View Fnb Page */}
              <BeverageTable data={drink} onAddToCart={handleAddToCart} />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Group>

      {/* Shopping cart Part */}
      <Group>
        {showCart && (
          <FnbCart
            data={selectedItems}
            setData={setSelectedItems}
            updateSelectedItems={updateSelectedItems}
          />
        )}
      </Group>

      {/* Submit Button */}
      <Group>
        <div className="submitBtn">
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Group>
    </div>
  );
}

export default FnbPurchase;
