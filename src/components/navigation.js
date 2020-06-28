import React, { useEffect, useRef } from 'react'
import { useMeasure } from 'react-use'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

import BackgroundFooter from '../components/background-image-footer'
import vimeoSrc from '../images/icon-vimeo.svg'

const Navigation = (props) => {
  const { isHome, setHeight } = props
  const [navRef, { height }] = useMeasure()

  useEffect(() => {
    // adding wrapper vertical padding
    setHeight(height + 40)
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
              <NavLink
                to="/work"
                activeClassName="is-active"
                $isHome={isHome}
                partiallyActive
              >
                <span>((</span>WORK<span>))</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/editors"
                activeClassName="is-active"
                $isHome={isHome}
              >
                <span>((</span>EDITORS<span>))</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/contact"
                activeClassName="is-active"
                $isHome={isHome}
              >
                <span>((</span>CONTACT<span>))</span>
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
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 767px) {
    flex-direction: row;
  }
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
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (min-width: 767px) {
    justify-content: flex-start;
  }

  > li {
    margin-top: 10px;
    margin-right: 0;

    @media screen and (min-width: 767px) {
      margin-right: 25px;
      margin-top: 0;
    }
  }
`

const NavLink = styled(Link)`
  color: ${({ $isHome, theme }) =>
    $isHome ? theme.colors.tan : theme.colors.purple};
  font-size: 18px;
  letter-spacing: 3.2px;
  text-transform: uppercase;
  transition: all 250ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.tan};
  }

  &.is-active {
    color: ${({ theme }) => theme.colors.tan};

    > span {
      opacity: 1;
    }
  }

  @media screen and (min-width: 767px) {
    font-size: 30px;
  }

  > span {
    opacity: 0;
    padding: 0 5px;
    transition: all 250ms ease;
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
