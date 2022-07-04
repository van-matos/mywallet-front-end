import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoExitOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../context/UserContext";

function BalancePage() {
    const { user } = useContext(UserContext);

    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    
    const { name, token } = user;

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get('http://localhost:5000/balance', config);
        promise.then((response) => setTransactions(response.data))
    })

    function SignOut() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const promise = axios.get("http://localhost:5000/signout", config);
        promise.then(toLogin);
    }

    function toLogin() {
        alert("Sessão encerrada.");
        navigate("/");
    }

    function renderTransactions() {
        if (!transactions.length) {
            return (
                <div className="empty">
                    <p>Não há registros de entrada ou saída</p>
                </div>
            );
        }

        return transactions.map((transaction, index) =>{
            const { date, description, amount, type } = transaction;
            const amountFixed = amount.toFixed(2);

            return (
                <Transaction type={type} index={index}>
                    <span>{date}</span>
                    <span>{description}</span>
                    <span>{amountFixed}</span>
                </Transaction>
            )
        });
    }

    function renderBalance() {
        if (!transactions.length) return <></>;

        let balance = 0;
        transactions.forEach(transaction => {
            if (transaction.type === "income") {
                balance += Number(transaction.amount);
            } else {
                balance -= Number(transaction.amount);
            }
        })

        return (
            <Balance balance={balance}>
                <span>Saldo</span>
                <span>{Number(balance).toFixed(2)}</span>
            </Balance>
        )
    }

    return (
        <Container>
            <Header>
                <h2>Olá, {name}</h2>
                <i onClick={() => SignOut()}>
                    <IoExitOutline />
                </i>
            </Header>
            <MainContainer transactions={transactions}>
                <Transactions>{renderTransactions()}</Transactions>
                {renderBalance()}
            </MainContainer>
            <NewTransaction>
                <Link to="/income">
                    <i>
                        <IoAddCircleOutline />
                    </i>
                    <span>Nova entrada</span>
                </Link>
                <Link to="/expenditure">
                    <i>
                        <IoRemoveCircleOutline />
                    </i>
                    <span>Nova saída</span>
                </Link>
            </NewTransaction>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    padding-bottom: 50px;
    font-family: "Raleway", sans-serif;  
    display: flex;
    flex-direction: column;
  
    h2 {
        font-weight: 700;
        font-size: 26px;
        line-height: 30px;
        color: #ffffff;
    }
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    i {
        font-size: 30px;
        color: #ffffff;
    }
`

const MainContainer = styled.div`
    width: 100%;
    height: calc((100vh - 120px));
    margin: 22px 0 13px 0;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => props.transactions.length === 0 ? "center" : "space-between"};
    overflow-y: scroll;

    .empty {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        font-family: "Raleway", sans-serif;
        font-size: 20px;
        line-height: 24px;
        color: #868686;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`

const Transactions = styled.div`
    height: 100%;
`

const Transaction = styled.div`
    display: flex;
    flex-direction: row;

    :last-child {
        margin-bottom: 20px;
    }

    span {
        margin-bottom: 15px;
        font-family: "Raleway", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #c6c6c6;
    }

    span:nth-child(2) {
        width: 100%;
        margin-left: 8px;
        color: #000000;
    }

    span:nth-child(3) {
        color: ${(props) => (props.type === "income" ? "#03AC00" : "#C70000")};
    }

    i {
        margin: 1px -5px 0 11px;
        font-size: 18px;
        line-height: 18.78px;
        color: #c6c6c6;
    }
`

const Balance = styled.div`
    height: 25px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 153px;
    left: 40px;
    right: 39px;

    span {
        font-family: "Raleway", sans-serif;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }

    span:nth-child(2) {
        font-weight: 400;
        color: ${(props) => (props.balance > 0 ? "#03AC00" : "#C70000")};
    }
`

const NewTransaction = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    a {
        width: 50%;
        height: 115px;
        margin: 0;
        padding: 10px;
        background-color: #a328d6;
        border-radius: 5px;
        font-size: 17px;
        line-height: 20px;
        word-spacing: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    a:first-child {
        margin-right: 8px;
    }

    i {
        font-size: 25px;
        color: #ffffff;
    }
`

export default BalancePage;