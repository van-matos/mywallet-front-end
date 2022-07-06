import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../context/UserContext";

function IncomePage() {
    const { user } = useContext(UserContext);
    
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate;

    const { token } = user;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    function newIncome(e) {
        e.preventDefault();

        const entry = {
            amount: parseFloat(amount),
            description,
            type: "income"
        };

        const promise = axios.post("https://back-mywallet-vm.herokuapp.com/income", entry, config)
        promise.then(toBalance);
        promise.catch((error) => alert(error.response.statusText));
    }

    function toBalance() {
        alert("Entrada adicionada com sucesso.")
        navigate("/balance");
        }
    
    return (
        <Container>
            <h2>Nova entrada</h2>
            <Form onSubmit={newIncome}>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    placeholder="Valor"
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="description"
                    id="description"
                    value={description}
                    placeholder="Descrição"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Salvar entrada</button>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    font-family: "Raleway", sans-serif;
    display: flex;
    flex-direction: column;

    h2 {
        margin-bottom: 40px;
        font-weight: 700;
        font-size: 26px;
        color: #ffffff;
        line-height: 30px;
    }
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export default IncomePage;
