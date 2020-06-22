import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset-advanced'

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    background: #cec1a5;
  }
`

export default GlobalStyle
