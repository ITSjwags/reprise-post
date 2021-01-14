import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Logo = (props) => {
  const { background, className } = props

  return (
    <StyledLink aria-label="reprisePostLogo" to="/">
      <StyledLogo
        width={500}
        height={500}
        viewBox="0 0 500 500"
        fill="none"
        className={className}
      >
        <defs>
        <clipPath id="prefix__clip-path">
          <circle
            className="prefix__cls-1"
            cx={-1935.91}
            cy={346.19}
            r={101.19}
          />
        </clipPath>
        <clipPath id="prefix__clip-path-2">
          <circle
            className="prefix__cls-1"
            cx={-2173.31}
            cy={346.19}
            r={101.19}
          />
        </clipPath>
        <style>{".prefix__cls-1{fill:none}.prefix__cls-11{fill:#fff}"}</style>
      </defs>
      <g
        style={{
          isolation: "isolate",
        }}
      >
        <g id="prefix__Layer_1" data-name="Layer 1">
          <g clipPath="url(#prefix__clip-path)">
            <image
              width={1920}
              height={1080}
              transform="matrix(4.01 0 0 4.01 -3527.72 -799.68)"
              xlinkHref="../../../Website/PurpleBG_01.png"
            />
          </g>
          <g clipPath="url(#prefix__clip-path-2)">
            <image
              width={1920}
              height={1080}
              transform="matrix(4.01 0 0 4.01 -3765.12 -799.68)"
              xlinkHref="../../../Website/WhiteBG_01.png"
            />
          </g>
          <circle cx={249.87} cy={249.41} r={240.36} fill={background} />
          <path
            d="M304.35 292.92a1.87 1.87 0 01-1-3.43A90.41 90.41 0 00302.9 138a1.87 1.87 0 012-3.13 94.14 94.14 0 01.44 157.78 1.85 1.85 0 01-.99.27z"
            fill="#d1cecf"
          />
          <path
            d="M297.51 279a1.87 1.87 0 01-1.06-3.41 75 75 0 00-.42-123.7 1.87 1.87 0 112.11-3.09 78.76 78.76 0 01.44 129.86 1.86 1.86 0 01-1.07.34z"
            fill="#e3e1e2"
          />
          <path
            d="M311.16 306.82a1.87 1.87 0 01-1-3.45 105.78 105.78 0 00-.43-179.29 1.86 1.86 0 012-3.16 109.52 109.52 0 01.44 185.61 1.89 1.89 0 01-1.01.29z"
            fill="#9f9b9c"
          />
          <path
            d="M318 320.71a1.87 1.87 0 01-1-3.46 121.18 121.18 0 00-.44-207 1.87 1.87 0 011.94-3.19 124.88 124.88 0 01.45 213.4 1.85 1.85 0 01-.95.25z"
            fill="#696365"
          />
          <g
            style={{
              mixBlendMode: "lighten",
            }}
          >
            <path
              className="prefix__cls-11"
              d="M276 273.43a63 63 0 006-2.89c.32-.17.63-.36.95-.54.63-.36 1.26-.74 1.89-1.13 1.26-.79 2.53-1.64 3.81-2.57.64-.46 1.29-.94 1.94-1.45A64.54 64.54 0 00251 149.25h-82.87v224h19.7V169h62.3A44.94 44.94 0 01295 213.84a45.43 45.43 0 01-27.69 41.46h-.14a44.68 44.68 0 01-16.11 3.33 4.71 4.71 0 00-.53 0H194.05v19.69h57.32a66 66 0 007.82-.56 64.56 64.56 0 0016.62-4.37z"
            />
            <path
              className="prefix__cls-11"
              d="M280 279.24l-.43-.89-1.36.57a69.34 69.34 0 01-15.75 4.51l-2.06.34.47 1 43.77 89.31h21.83z"
            />
          </g>
        </g>
      </g>
      </StyledLogo>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  margin: 24px auto 16px;
  transition: transform 250ms ease;

  @media screen and (min-width: 767px) {
    &:hover {
      transform: scale(1.02);
    }
  }
`

const StyledLogo = styled.svg`
  height: 9vw;
  min-height: 90px;
  max-height: 180px;
  width: 100%;
`

Logo.propTypes = {
  background: PropTypes.string,
}

Logo.defaultProps = {
  background: '#42393c'
}

export default Logo
