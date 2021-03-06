import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../context/UserContext";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function Login(e) {
        e.preventDefault();
        const user = {
            email,
            password
        };

        const promise = axios.post("https://back-mywallet-vm.herokuapp.com/login", user);
        promise.then(response => toBalance(response.data));
        promise.catch(failure);
    }

    function toBalance(data) {
        setUser(data);
        navigate("/balance")
    }

    function failure() {
            setEmail("");
            setPassword("");
            alert("Usuário e/ou senha inválidos");
        }

    return (
        <Container>
            <h1>MyWallet</h1>
            <Form onSubmit={Login}>
                <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    required>
                </input>
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    required>
                </input>
                <button type="submit">Entrar</button>
            </Form>
            <Link to="/signup">Primeira vez? Cadastre-se!</Link>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    font-family: "Raleway", sans-serif;    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`

export default LoginPage;