import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

import BackgroundFooter from '../components/background-image-footer'
import vimeoSrc from '../images/icon-vimeo.svg'

const Navigation = (props) => {
  const { isHome, setHeight } = props
  const navRef = useRef()
  const height = navRef?.current?.clientHeight

  useEffect(() => {
    setHeight(height)
  }, [height, setHeight])

  return (
    <Wrapper ref={navRef}>
      <BackgroundFooter />
      <Row>
        <li>
          <Vimeo
            href="https://vimeo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={vimeoSrc} alt="vimeo logo mark" />
          </Vimeo>
        </li>
        <li>
          <PageLinks>
            <li>
              <NavLink to="/work" activeClassName="is-active" isHome={isHome}>
                WORK
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/editors"
                activeClassName="is-active"
                isHome={isHome}
              >
                EDITORS
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/contact"
                activeClassName="is-active"
                isHome={isHome}
              >
                CONTACT
              </NavLink>
            </li> */}
          </PageLinks>
        </li>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Row = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Vimeo = styled.a`
  display: block;
  height: 23px;
  transition: transform 250ms ease;
  width: 26px;

  &:hover {
    transform: scale(1.05);
  }

  > img {
    display: block;
    width: 100%;
  }
`

const PageLinks = styled.ul`
  align-items: center;
  display: flex;

  > li {
    margin-right: 10px;

    @media screen and (min-width: 767px) {
      margin-right: 75px;
    }
  }
`

const NavLink = styled(Link)`
  color: ${({ isHome, theme }) =>
    isHome ? theme.colors.tan : theme.colors.purple};
  font-size: 14px;
  letter-spacing: 3.2px;
  text-transform: uppercase;

  &.is-active {
    color: ${({ theme }) => theme.colors.tan};

    &::before {
      content: '((';
      padding-right: 5px;
    }
    &::after {
      content: '))';
      padding-left: 5px;
    }
  }

  @media screen and (min-width: 767px) {
    font-size: 30px;
  }
`

Navigation.propTypes = {
  isHome: PropTypes.bool,
  setHeight: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
  isHome: false,
}

export default Navigation
