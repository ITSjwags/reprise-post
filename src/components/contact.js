import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

const Contact = (props) => {
  const { offset } = props

  const data = useStaticQuery(graphql`
    query SiteInfo {
      datoCmsSiteInfo {
        email
        phone
      }
    }
  `)

  const email = data?.datoCmsSiteInfo?.email
  const phone = data?.datoCmsSiteInfo?.phone

  return (
    <AnimatePresence>
      <Row
        key="contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        offset={offset}
      >
        <Link href={`mailto:${email}`}>{email}</Link>
        <Divider>|</Divider>
        <Link href={`tel:${phone}`}>{phone}</Link>
      </Row>
    </AnimatePresence>
  )
}

const Row = styled(motion.div)`
  padding: 20px 0;
  text-align: right;

  @media screen and (min-width: 767px) {
    padding: 20px ${({ offset }) => offset + 10}px 20px 20px;
  }
`

const fontStyles = css`
  color: ${({ theme }) => theme.colors.tan};
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 2.2px;

  @media screen and (min-width: 767px) {
    font-size: 30px;
  }
`

const Link = styled(OutboundLink)`
  border-bottom: 2px solid transparent;
  display: block;
  ${fontStyles};
  padding-bottom: 10px;
  transition: all 250ms ease;
  white-space: nowrap;

  &:last-of-type {
    padding-bottom: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.tan};
  }

  @media screen and (min-width: 767px) {
    display: inline;
    padding-bottom: 0;
  }
`

const Divider = styled.span`
  display: none;

  @media screen and (min-width: 767px) {
    display: inline;
    ${fontStyles};
    padding: 0 15px;
  }
`

Contact.propTypes = {
  offset: PropTypes.number.isRequired,
}

export default Contact
