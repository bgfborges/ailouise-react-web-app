import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        outline: 0;
    }

    body{
        background: #030304;
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button{
        font-family: 'Montserrat', sans-serif;
        font-size: 16;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong{
        font-weight: 700;
        font-size: 30px;
    }

    button{
        cursor: pointer;
    }
`;
