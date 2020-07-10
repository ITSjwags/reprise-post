import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset-advanced'

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    color: ${({ theme }) => theme.colors.purple};
    font-family: "trade-gothic-next", sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 1.2;
  }

  body {
    background-color: ${({ theme }) => theme.colors.tan};
  }

  b, strong, .bold {
    font-weight: bold;
  }

  i, em, .italic {
    font-style: italics;
  }
`

export default GlobalStyle
