import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Navigation = ({ siteTitle }) => (
  <nav
    style={{
      background: `rebeccapurple`,
      padding: `20px`,
    }}
  >
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
  </nav>
)

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
