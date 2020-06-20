// Gatsby supports TypeScript natively!
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const EditorsPage = props => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the editors page</h1>
    <p>Welcome to editors ({props.path})</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default EditorsPage
