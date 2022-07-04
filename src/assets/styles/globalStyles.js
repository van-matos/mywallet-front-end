import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


  *{
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 25px;
    background: #8c11be;
    font-family: 'Raleway', sans-serif;
    overflow: hidden;
  }

  h1 {
    margin-bottom: 28px;
    font-family: 'Saira Stencil One', cursive;
    font-weight: 400;
    font-size: 32px;
    color:#FFFFFF;
  }

  input {
    width:100%;
    height:58px;
    margin-bottom: 13px;
    padding: 16px;
    background-color:#FFFFFF;
    border: none;
    border-radius: 5px;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    text-decoration: none;
  }

  a {
    margin-top: 34px;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color:#FFFFFF;
    text-decoration: none;
  }

  button {
    width:100%;
    height:46px;
    padding: 12px;
    background-color:#A328D6;
    border: none;
    border-radius: 5px;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;
  }
`

export default GlobalStyle;