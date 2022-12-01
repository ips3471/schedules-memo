import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${normalize}
    body {
        width: 100vw;
    	height: 100vh;

    }
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    ul {
        list-style: none;
    }
    button, input {
        outline: none;
    }

`;

export default GlobalStyle;
