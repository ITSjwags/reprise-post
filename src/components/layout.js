import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
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
  const { height } = useWindowSize()

  const setWindowHeight = () => {
    document !== undefined &&
      document
        .querySelector(':root')
        .style.setProperty(
          '--vh',
          window !== undefined && window.innerHeight / 100 + 'px'
        )
  }

  useEffect(() => {
    window !== undefined &&
      window.addEventListener('resize', () => setWindowHeight())

    return () => {
      window !== undefined &&
        window.removeEventListener('resize', () => setWindowHeight())
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Background />

      <StyledMain cover={cover} height={height} bottomSpace={navHeight}>
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
  height: ${({ height }) => `${height}px` || 'calc(100 * var(--vh))'};
  overflow: hidden;
  overflow-y: ${({ cover }) => (cover ? 'hidden' : 'auto')};
  -webkit-overflow-scrolling: touch;
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
