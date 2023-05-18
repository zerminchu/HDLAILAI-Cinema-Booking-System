import {
    TextInput,
    NumberInput,
    Button,
    Container,
    Grid,
    Tabs,
    Group,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TicketHistoryTable from "./TicketHistoryTable";
import FnbHistoryTable from "./FnbHistoryTable";

function TicketPurchaseHistory() {
    const { id } = useParams();
    //display the first tab food when load in
    const [activeTab, setActiveTab] = useState("Fnb");

    //ticket
    const [ticket, setTicket] = useState([]);

    //fnb
    const [fnb, setFnb] = useState([]);

    async function getTransaction(id) {
        try {
            const transactionResponse = await axios.get(`http://localhost:8080/viewtransaction/useraccount/${id}`);
            const loadedTransaction = transactionResponse.data;

            const newFnb = loadedTransaction.filter((Transaction) => Transaction.type === "fnb");
            const newTicket = loadedTransaction.filter((Transaction) => Transaction.type === "ticket");

            setFnb(newFnb);
            setTicket(newTicket);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTransaction(id);
    }, []);

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
                            <Tabs.Tab value="Fnb">Fnb</Tabs.Tab>
                            <Tabs.Tab value="Ticket">Ticket</Tabs.Tab>
                        </Tabs.List>
                        {/* Food Tab */}
                        <Tabs.Panel value="Fnb" pt="xs">
                            {/* View Fnb Page */}
                            <FnbHistoryTable data={fnb} setData={setFnb} />
                        </Tabs.Panel>

                        {/* Ticket Tab */}
                        <Tabs.Panel value="Ticket" pt="xs">
                            {/* View Ticket Page */}
                            <TicketHistoryTable data={ticket} setData={setTicket} />
                        </Tabs.Panel>
                    </Tabs>
                </Container>
            </Group>
        </div>
    );
}

export default TicketPurchaseHistory;
