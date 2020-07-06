import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

const LogoMark = (props) => {
  const { className, color } = props

  return (
    <StyledLink to="/">
      <StyledLogo
        width={100}
        height={139}
        viewBox="0 0 100 139"
        fill="none"
        className={className}
      >
        <path
          d="M24.49 5.1H42a53.21 53.21 0 0153.21 53.21 53.122 53.122 0 01-22.6 43.51 2.12 2.12 0 00-.913 1.373 2.108 2.108 0 001.756 2.475 2.105 2.105 0 001.597-.408 57.333 57.333 0 0024.38-46.95A57.44 57.44 0 0042 .87H24.49a2.12 2.12 0 000 4.23z"
          fill={color}
        />
        <path
          d="M66.87 90.34a2.108 2.108 0 00-.807 1.403 2.116 2.116 0 003.387 1.947A44.664 44.664 0 0086.8 58.31a44.772 44.772 0 00-13.121-31.67 44.751 44.751 0 00-31.68-13.1H30.7a2.11 2.11 0 100 4.22H42A40.551 40.551 0 0182.54 58.31a40.468 40.468 0 01-15.67 32.03zM56.23 91.74a36.298 36.298 0 01-8.2 2.35l21.85 44.57h9.35l-23-46.92z"
          fill={color}
        />
        <path
          d="M9.06 34.66h32.52a23.655 23.655 0 0121.85 14.6 23.66 23.66 0 011.8 9.05 23.735 23.735 0 01-11.76 20.41 23.214 23.214 0 01-2.86 1.44h-.05a23.427 23.427 0 01-8.48 1.75h-28.8v8.45H42c1.355-.007 2.707-.1 4.05-.28a32.277 32.277 0 008.28-2.18 32.85 32.85 0 003-1.44 32.465 32.465 0 0016.8-28.15A32.1 32.1 0 0042 26.21H.62v112.45h8.44v-104z"
          fill={color}
        />
      </StyledLogo>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  display: block;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.05);
  }
`

const StyledLogo = styled.svg`
  height: 35px;
  width: auto;
`

LogoMark.propTypes = {
  color: PropTypes.string,
}

LogoMark.defaultProps = {
  color: '#CCC4A7',
}

export default LogoMark
