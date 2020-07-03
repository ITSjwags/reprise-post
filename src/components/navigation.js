import React, { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import BackgroundFooter from '../components/background-image-footer'
import vimeoSrc from '../images/icon-vimeo.svg'
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
        <BackgroundFooter />
        <Row ref={navRef} animate>
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
        <AnimatePresence>
          <Content animate rowHeight={height} layoutId="nav">
            {navModal === 'editors' && <Editors layoutId="nav" />}
            {navModal === 'contact' && (
              <Contact layoutId="nav" offset={width} />
            )}
          </Content>
        </AnimatePresence>
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
    margin-top: 20px;
    margin-right: 0;

    @media screen and (min-width: 767px) {
      /* margin-right: 15px; */
      margin-top: 0;
    }
  }
`

const linkStyles = css`
  color: ${({ $isHome, theme }) =>
    $isHome ? theme.colors.tan : theme.colors.purple};
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 1px;
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
  max-height: calc(calc(100 * var(--vh)) - ${({ rowHeight }) => rowHeight}px);
  overflow-y: auto;
  overscroll-behavior: contain;
`

Navigation.propTypes = {
  isHome: PropTypes.bool,
  setHeight: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
  isHome: false,
}

export default Navigation
