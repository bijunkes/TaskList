import { createGlobalStyle } from 'styled-components';

const MyGlobalStyles = createGlobalStyle`
    :root {
        --fundo-parte1: #242424;
        --fundo-parte2: #2A2A2A;
        --fundo-campo: #313131;
        --cor-texto: #ffffff;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        list-style: none;
    }

    body {
        min-height: 100vh;
        width: 100vw;
    }
    
    button, form {
        all: unset;
        display: inline-block;
    }

    input {
        all: unset;
    }
`

export default MyGlobalStyles