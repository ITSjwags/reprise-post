import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Logo = (props) => {
  const { className } = props

  return (
    <StyledLink to="/">
      <StyledLogo
        width={185}
        height={186}
        viewBox="0 0 185 186"
        fill="none"
        className={className}
      >
        <path
          d="M79.49 5.1H97a53.21 53.21 0 0153.21 53.21 53.122 53.122 0 01-22.6 43.51 2.12 2.12 0 00-.913 1.373 2.108 2.108 0 001.756 2.475 2.105 2.105 0 001.597-.408 57.333 57.333 0 0024.38-46.95A57.44 57.44 0 0097 .87H79.49a2.12 2.12 0 000 4.23z"
          fill="#4E4366"
        />
        <path
          d="M121.87 90.34a2.108 2.108 0 00-.807 1.403 2.116 2.116 0 003.387 1.947 44.664 44.664 0 0017.35-35.38 44.772 44.772 0 00-13.121-31.67 44.751 44.751 0 00-31.68-13.1H85.7a2.11 2.11 0 100 4.22H97a40.551 40.551 0 0140.541 40.55 40.468 40.468 0 01-15.67 32.03zM111.23 91.74a36.298 36.298 0 01-8.2 2.35l21.85 44.57h9.35l-23-46.92z"
          fill="#4E4366"
        />
        <path
          d="M64.06 34.66h32.52a23.655 23.655 0 0121.85 14.6 23.66 23.66 0 011.8 9.05 23.735 23.735 0 01-11.76 20.41 23.214 23.214 0 01-2.86 1.44h-.05a23.427 23.427 0 01-8.48 1.75h-28.8v8.45H97c1.355-.007 2.707-.1 4.05-.28a32.277 32.277 0 008.28-2.18 32.85 32.85 0 003-1.44 32.465 32.465 0 0016.8-28.15A32.1 32.1 0 0097 26.21H55.62v112.45h8.44v-104zM23.18 161.01c0-5.93-3.74-9.07-12.22-9.07H.84v32.73h4.38v-14.1h7.52l6.93 14.09h4.92l-7.7-15.22c3.87-1.28 6.29-3.97 6.29-8.43zM11.1 166.8H5.22v-11h6.11c3.51 0 7.47.59 7.47 5.47 0 5.06-4.87 5.52-7.7 5.52v.01zM36.52 169.57h11.04v-3.74H36.52v-10.08h15.37v-3.83H32.15v32.74h20.47v-3.83h-16.1v-11.26zM70 151.93H59.91v32.73h4.37v-13.58h5.34c8.34 0 12.54-3.1 12.54-9.67s-4.06-9.48-12.16-9.48zm0 15.41h-5.66v-11.58h6.07c4.92 0 7.48 1.77 7.48 5.65-.06 5.33-4.49 5.93-7.95 5.93H70zM112 161.01c0-5.93-3.74-9.07-12.22-9.07H89.66v32.73H94v-14.1h7.52l6.94 14.09h4.92l-7.71-15.22c3.92-1.28 6.33-3.97 6.33-8.43zm-12.09 5.79H94v-11h6.11c3.51 0 7.48.59 7.48 5.47.04 5.06-4.84 5.52-7.67 5.52l-.01.01zM125.35 151.92h-4.38v32.74h4.38v-32.74zM138 160.01c0-3.14 2.51-4.92 6.11-4.92 3.6 0 5.52 1.59 6.93 5l3.69-1.37c-1.46-4.74-4.92-7.34-10.62-7.34-5.88 0-10.17 3.24-10.17 8.75 0 11.58 17.46 7.62 17.46 15.83 0 3.55-2.73 5.47-6.7 5.47-4.37 0-6.47-2-7.79-6.07l-4.06 1.37c2 5.93 5.47 8.48 11.67 8.48 6.52 0 11.08-3.24 11.08-9.53.04-11.76-17.6-8.21-17.6-15.67zM168.09 180.83v-11.26h11.04v-3.74h-11.04v-10.08h15.37v-3.83h-19.75v32.74h20.48v-3.83h-16.1z"
          fill="#4E4366"
        />
      </StyledLogo>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  margin: 24px auto;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.02);
  }
`

const StyledLogo = styled.svg`
  height: 7vw;
  min-height: 90px;
  max-height: 180px;
  width: 100%;
`

export default Logo