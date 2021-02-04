import React, { useEffect, useState } from 'react'
import { useMeasure, useWindowSize } from 'react-use'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import styled, { css } from 'styled-components'
import { motion, AnimateSharedLayout } from 'framer-motion'

import BackgroundFooter from '../components/background-image-footer'
import LogoMark from '../components/logo-mark'
import arrowSrc from '../images/icon-downArrow-color.svg'
import vimeoSrc from '../images/icon-vimeo.svg'
import instagramSrc from '../images/icon-instagram.svg'
import facebookSrc from '../images/icon-facebook.svg'
import linkedinSrc from '../images/icon-linkedin.svg'

import Contact from './contact'
import Editors from './editors'

const Navigation = (props) => {
  const { isHome, setHeight } = props
  const [navModal, setNavModal] = useState('')
  const [navRef, { height }] = useMeasure()
  const [closeRef, { width }] = useMeasure()
  const { width: windowWidth } = useWindowSize()

  const isMobile = windowWidth < 767
  const paddedHeight = height + 40

  const isModalOpen = navModal === 'editors' || navModal === 'contact'

  useEffect(() => {
    // adding wrapper vertical padding
    setHeight(paddedHeight)
  }, [paddedHeight, setHeight])

  const handleClickNav = () => {
    setNavModal('')
  }

  const handleClickEditors = () => {
    setNavModal('editors')
    typeof window !== 'undefined' &&
      window.gtag &&
      window.gtag('event', 'navigation-modal-click', {
        event_category: 'Editors Modal',
        event_label: 'Open Editors Modal',
      })
  }

  const handleClickContact = () => {
    setNavModal('contact')
    typeof window !== 'undefined' &&
      window.gtag &&
      window.gtag('event', 'navigation-modal-click', {
        event_category: 'Contact Modal',
        event_label: 'Open Contact Modal',
      })
  }

  return (
    <AnimateSharedLayout>
      <Wrapper layout>
        <BackgroundFooter layout />
        <TopRow ref={navRef} isModalOpen={isModalOpen} layout>
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
        </TopRow>

        <LeftRow layout>
          {!isMobile && (
            <LogoContainer>
              <LogoMark onClick={handleClickNav} />
            </LogoContainer>
          )}
          <SocialsList>
            <SocialsListItem>
              <SocialLink
                href="https://vimeo.com/reprisepost"
                target="_blank"
                rel="noopener noreferrer"
                height={18}
                width={16}
              >
                <img src={vimeoSrc} alt="vimeo logo" />
              </SocialLink>
            </SocialsListItem>
            <SocialsListItem>
              <SocialLink
                href="https://www.instagram.com/reprise_post/"
                target="_blank"
                rel="noopener noreferrer"
                height={18}
                width={18}
              >
                <img src={instagramSrc} alt="instagram logo" />
              </SocialLink>
            </SocialsListItem>
            <SocialsListItem>
              <SocialLink
                href="https://www.facebook.com/reprisepost"
                target="_blank"
                rel="noopener noreferrer"
                height={18}
                width={9}
              >
                <img src={facebookSrc} alt="facebook logo" />
              </SocialLink>
            </SocialsListItem>
            <SocialsListItem>
              <SocialLink
                href="https://www.linkedin.com/company/reprise-post/"
                target="_blank"
                rel="noopener noreferrer"
                height={18}
                width={18}
              >
                <img src={linkedinSrc} alt="linkedin logo" />
              </SocialLink>
            </SocialsListItem>
          </SocialsList>
        </LeftRow>

        <Content rowHeight={paddedHeight} layout>
          {navModal === 'editors' && <Editors layoutId="nav" />}
          {navModal === 'contact' && <Contact layoutId="nav" offset={width} />}
        </Content>
      </Wrapper>
    </AnimateSharedLayout>
  )
}

const Wrapper = styled(motion.nav)`
  background: ${({ theme }) => theme.colors.brown};
  max-height: 100%;
  padding: 23px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const LeftRow = styled(motion.div)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 767px) {
    flex-direction: row;
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
`

const TopRow = styled(motion.div)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;

  @media screen and (min-width: 767px) {
    flex-direction: row;
  }
`

const LogoContainer = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.white};
  margin-right: 20px;
  padding-right: 20px;
`

const SocialsList = styled.ul`
  align-items: center;
  display: flex;
`

const SocialsListItem = styled.ul`
  align-items: center;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
`

const SocialLink = styled(OutboundLink)`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: block;
  height: ${({ height }) => height}px;
  opacity: 0.5;
  transition: all 250ms ease;
  width: ${({ width }) => width}px;

  &:hover {
    opacity: 1;
  }

  > img {
    display: block;
    width: 100%;
  }
`

const PageLinks = styled(motion.ul)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (min-width: 767px) {
    justify-content: flex-start;
  }
`

const linkStyles = css`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 1px;
  opacity: 0.5;
  text-transform: uppercase;
  transition: all 250ms ease;

  &:hover {
    opacity: 1;

    > span {
      opacity: 0;
    }
  }

  &.is-active {
    opacity: 1;

    > span {
      opacity: 1;
    }
  }

  @media screen and (min-width: 767px) {
    font-size: 28px;
    letter-spacing: 0.42em;
  }

  > span {
    opacity: 0;
    transition: all 250ms ease;
  }
`

const ModalLink = styled.button`
  ${linkStyles};

  margin: 10px 0;

  @media screen and (min-width: 767px) {
    margin: 0;
  }
`

const NavLink = styled(Link)`
  ${linkStyles};
`

const Close = styled.button`
  cursor: pointer;
  display: ${({ hide }) => (hide ? 'none' : 'initial')};
  height: 26px;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  pointer-events: ${({ hide }) => (hide ? 'none' : 'auto')};
  margin-left: ${({ hide }) => (hide ? '0' : '10px')};
  transition: opacity 250ms ease;
  width: 26px;

  @media screen and (min-width: 767px) {
    display: initial;
    height: 44px;
    margin-left: 0;
    width: 44px;
  }

  > img {
    display: block;
    width: 100%;
  }
`

const Content = styled.div`
  max-height: calc(100 * var(--vh) - ${({ rowHeight }) => rowHeight}px);
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
