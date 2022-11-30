import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${normalize}
    body {
        /* overflow: hidden; */
        width: 100vw;
	height: 100vh;
	/* overflow: hidden; */

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
