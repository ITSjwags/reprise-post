import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import theme from '../theme'

import GlobalStyle from './global-style'
import Background from './background-image'
import Logo from '../components/logo'
import Navigation from './navigation'

const Layout = (props) => {
  const { children, cover, isHome } = props
  const [navHeight, setNavHeight] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Background />
      <StyledMain cover={cover} bottomSpace={navHeight}>
        <Logo />
        {children}
      </StyledMain>
      <Navigation
        setHeight={(height) => setNavHeight(height)}
        isHome={isHome}
      />
    </ThemeProvider>
  )
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  overflow-y: ${({ cover }) => (cover ? 'hidden' : 'auto')};
  /* using border instead of padding to account for
  ff / edge not loving padding bottom on an div with overflow */
  border-bottom: ${({ bottomSpace }) => bottomSpace}px solid transparent;

  @media screen and (min-width: 767px) {
    min-height: 500px;
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cover: PropTypes.bool,
  isHome: PropTypes.bool,
}

Layout.defaultProps = {
  cover: false,
  isHome: false,
}

export default Layout
