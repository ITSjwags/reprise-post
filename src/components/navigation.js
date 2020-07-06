import React, { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion, AnimateSharedLayout } from 'framer-motion'

import BackgroundFooter from '../components/background-image-footer'
import LogoMark from '../components/logo-mark'
import arrowSrc from '../images/icon-downArrow-color.svg'

import Contact from './contact'
import Editors from './editors'

const Navigation = (props) => {
  const { isHome, setHeight } = props
  const [navModal, setNavModal] = useState('')
  const [navRef, { height }] = useMeasure()
  const [closeRef, { width }] = useMeasure()

  const isModalOpen = navModal === 'editors' || navModal === 'contact'

  useEffect(() => {
    // adding wrapper vertical padding
    setHeight(height + 40)
  }, [height, setHeight])

  const handleClickNav = () => {
    setNavModal('')
  }

  const handleClickEditors = () => {
    setNavModal('editors')
  }

  const handleClickContact = () => {
    setNavModal('contact')
  }

  return (
    <AnimateSharedLayout>
      <Wrapper animate>
        <BackgroundFooter animate />
        <Row ref={navRef} animate>
          <li>
            <LogoMark />
          </li>
          <li>
            <PageLinks>
              <li>
                <NavLink
                  to="/work"
                  activeClassName={isModalOpen ? '' : 'is-active'}
                  onClick={handleClickNav}
                  $isHome={isModalOpen ? false : isHome}
                  partiallyActive
                >
                  <span>((</span>WORK<span>))</span>
                </NavLink>
              </li>
              <li>
                <ModalLink
                  className={navModal === 'editors' ? 'is-active' : ''}
                  onClick={handleClickEditors}
                  $isHome={isModalOpen ? false : isHome}
                >
                  <span>((</span>EDITORS<span>))</span>
                </ModalLink>
              </li>
              <li>
                <ModalLink
                  className={navModal === 'contact' ? 'is-active' : ''}
                  onClick={handleClickContact}
                  $isHome={isModalOpen ? false : isHome}
                >
                  <span>((</span>CONTACT<span>))</span>
                </ModalLink>
              </li>
              <li ref={closeRef}>
                <Close onClick={handleClickNav} hide={!isModalOpen}>
                  <img src={arrowSrc} alt="down arrow" />
                </Close>
              </li>
            </PageLinks>
          </li>
        </Row>

        <Content rowHeight={height}>
          {navModal === 'editors' && <Editors layoutId="nav" />}
          {navModal === 'contact' && <Contact layoutId="nav" offset={width} />}
        </Content>
      </Wrapper>
    </AnimateSharedLayout>
  )
}

const Wrapper = styled(motion.nav)`
  max-height: 100%;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Row = styled(motion.ul)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media screen and (min-width: 767px) {
    flex-direction: row;
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
    margin: 20px 0 10px 0;

    @media screen and (min-width: 767px) {
      margin: 0;
    }
  }
`

const linkStyles = css`
  color: ${({ $isHome, theme }) => theme.colors.tan};
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 1px;
  opacity: ${({ $isHome }) => ($isHome ? 1 : 0.3)};
  text-transform: uppercase;
  transition: all 250ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.tan};
    opacity: 1;

    > span {
      opacity: ${({ $isHome }) => ($isHome ? 1 : 0)};
    }
  }

  &.is-active {
    color: ${({ theme }) => theme.colors.tan};
    opacity: 1;

    > span {
      opacity: 1;
    }
  }

  @media screen and (min-width: 767px) {
    font-size: 30px;
    letter-spacing: 3.2px;
  }

  > span {
    opacity: 0;
    padding: 0 5px;
    transition: all 250ms ease;
  }
`

const ModalLink = styled.button`
  ${linkStyles};
`

const NavLink = styled(Link)`
  ${linkStyles};
`

const Close = styled.button`
  cursor: pointer;
  height: 26px;
  margin-left: 15px;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  pointer-events: ${({ hide }) => (hide ? 'none' : 'auto')};
  position: absolute;
  top: 0;
  right: 0;
  transition: opacity 250ms ease;
  width: 26px;

  @media screen and (min-width: 767px) {
    height: 44px;
    position: static;
    width: 44px;
  }

  > img {
    display: block;
    width: 100%;
  }
`

const Content = styled.div`
  max-height: calc(100vh - ${({ rowHeight }) => rowHeight}px);
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

Navigation.propTypes = {
  isHome: PropTypes.bool,
  setHeight: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
  isHome: false,
}

export default Navigation
