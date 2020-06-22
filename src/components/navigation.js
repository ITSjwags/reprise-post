import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Navigation = (props) => {
  const { setHeight, siteTitle } = props
  const navRef = useRef()
  const height = navRef?.current?.clientHeight

  useEffect(() => {
    setHeight(height)
  }, [height, setHeight])

  return (
    <Wrapper ref={navRef}>
      <ul>
        <li>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </li>
        <li>
          <Link
            to="/work"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            WORK
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background: #4e4366;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

Navigation.propTypes = {
  setHeight: PropTypes.func.isRequired,
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
