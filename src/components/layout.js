import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import GlobalStyle from './global-style'
import Logo from '../components/logo'
import Navigation from './navigation'

const Layout = (props) => {
  const { children, cover } = props
  const [navHeight, setNavHeight] = useState(0)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <StyledMain cover={cover} paddingBottom={navHeight}>
        <Logo />
        {children}
      </StyledMain>
      <Navigation
        siteTitle={data.site.siteMetadata.title}
        setHeight={(height) => setNavHeight(height)}
      />
      {/* <footer>© {new Date().getFullYear()}, Reprise Post</footer> */}
    </>
  )
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  height: ${({ cover }) => (cover ? '100vh' : 'auto')};
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cover: PropTypes.bool,
}

Layout.defaultProps = {
  cover: false,
}

export default Layout
