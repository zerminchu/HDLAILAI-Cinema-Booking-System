import React, { useEffect, useState } from "react";
import CustomerPurchaseButton from "./CustomerPurchaseButton";
import FnbCart from "./FnbCart";
import { Table, Text, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TicketHistoryTable({ data, setData }) {
    console.log(data);

    function handleCancel(id) {
        axios
            .delete(`http://localhost:8080/canceltransaction/${id}`, {
                cancelled: true,
            })
            .then(() => {
                setData(
                    data.map((transaction) =>
                        transaction.id === id ? { ...transaction, cancelled: true } : transaction
                    )
                );
            })
            .catch((error) => console.log(error));
    }

    const rows = data.map((item, index) => (
        <tr key={index}>
            <td>{new Date(item.dateTime).toDateString()}</td>
            <td>${item.totalNetPrice / 100}</td>
            <td>
                {item.cancelled === false ? (
                    <Button
                        variant="outline"
                        radius="xl"
                        size="xs"
                        uppercase
                        onClick={() => {
                            handleCancel(item.id);
                        }}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        radius="xl"
                        size="xs"
                        color="gray"
                        uppercase
                    >
                        Cancelled
                    </Button>
                )}
            </td>
        </tr>
    ));

    return (
        <>
            <Table miw={720} verticalSpacing="sm">
                <thead>
                    <tr>
                        <th>Purchase Date</th>
                        <th>Price</th>
                        <th>Cancel Ticket</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}

export default TicketHistoryTable;
