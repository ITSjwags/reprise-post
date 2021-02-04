import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useStaticQuery, graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import Background from '../components/background-image'
import Logo from '../components/logo'
import theme from '../theme'

import GlobalStyle from './global-style'
import Navigation from './navigation'

const Layout = (props) => {
  const { children, cover, isHome, isWork } = props
  const [navHeight, setNavHeight] = useState(0)
  const { height } = useWindowSize()

  const data = useStaticQuery(graphql`
    query WorkFilterQuery {
      allDatoCmsEditor {
        edges {
          node {
            name
            shortName
          }
        }
      }
    }
  `)

  const editors = data?.allDatoCmsEditor?.edges

  const filteredEditors = editors.filter(
    ({ node }) => node?.shortName?.toLowerCase() !== 'heather'
  )

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
    setWindowHeight()

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
        <Header isWork={isWork}>
          {isWork && (
            <FilterRow>
              <FilterButton to="/work" activeClassName="is-active">
                All work
              </FilterButton>

              {filteredEditors.map((editor) => {
                return (
                  <FilterButton
                    to={`/work/${editor?.node?.shortName?.toLowerCase()}`}
                    activeClassName="is-active"
                    partiallyActive
                  >
                    {editor?.node?.name}
                  </FilterButton>
                )
              })}
            </FilterRow>
          )}
          <Logo />
        </Header>
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

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: ${({ isWork }) => isWork ? 'space-between' : 'center'};
  margin: 10px auto;
  padding: 0 20px;
  width: 100%;

  @media screen and (min-width: 767px) {
    justify-content: ${({ isWork }) => isWork ? 'space-between' : 'flex-end'};
    margin: 15px auto;
    width: 95%;
  }
`

const FilterRow = styled.ul`
  display: flex;
  flex-direction: column;
`

const FilterButton = styled(Link)`
  font-size: 12px;
  letter-spacing: 0.42em;
  margin-top: 3px;
  padding: 2px 0;
  text-transform: uppercase;
  transition: all 250ms ease;
  white-space: nowrap;

  &:hover {
    font-weight: bold;
  }

  &.is-active {
    border-top: 2px solid;
    font-weight: bold;
  }

  @media screen and (min-width: 767px) {
    font-size: 18px;
    margin-top: 5px;
    padding: 5px 0;
    width: 100%;
    min-width: 260px;
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cover: PropTypes.bool,
  isHome: PropTypes.bool,
  isWork: PropTypes.bool,
}

Layout.defaultProps = {
  cover: false,
  isHome: false,
  isWork: false,
}

export default Layout
