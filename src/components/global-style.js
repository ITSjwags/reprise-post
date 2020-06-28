import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset-advanced'

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'TradeGothic LT';
    src: local('Trade Gothic LT Bold Oblique'), local('TradeGothicLT-BoldOblique'),
        url('TradeGothicLT-BoldOblique.woff2') format('woff2'),
        url('TradeGothicLT-BoldOblique.woff') format('woff');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'TradeGothic LT';
    src: local('Trade Gothic LT'), local('TradeGothicLT'),
        url('TradeGothicLT.woff2') format('woff2'),
        url('TradeGothicLT.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
      font-family: 'TradeGothic LT';
      src: local('Trade Gothic LT Light Oblique'), local('TradeGothicLT-LightOblique'),
          url('TradeGothicLT-LightOblique.woff2') format('woff2'),
          url('TradeGothicLT-LightOblique.woff') format('woff');
      font-weight: 300;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'TradeGothic LT';
      src: local('Trade Gothic LT Light'), local('TradeGothicLT-Light'),
          url('TradeGothicLT-Light.woff2') format('woff2'),
          url('TradeGothicLT-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'TradeGothic LT';
      src: local('Trade Gothic LT Oblique'), local('TradeGothicLT-Oblique'),
          url('TradeGothicLT-Oblique.woff2') format('woff2'),
          url('TradeGothicLT-Oblique.woff') format('woff');
      font-weight: normal;
      font-style: italic;
      font-display: swap;
  }

  @font-face {
      font-family: 'TradeGothic LT';
      src: local('Trade Gothic LT Bold'), local('TradeGothicLT-Bold'),
          url('TradeGothicLT-Bold.woff2') format('woff2'),
          url('TradeGothicLT-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }

  html, body {
    color: ${({ theme }) => theme.colors.purple};
    font-family: "TradeGothic LT", "sans-serif";
    font-style: normal;
    font-weight: normal;
    line-height: 1.2;
    overscroll-behavior: none;
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
