import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Content>
      <Title>NOT FOUND</Title>
      <Copy>You just hit a route that doesn&#39;t exist... the sadness.</Copy>
    </Content>
  </Layout>
)

const Content = styled.div`
  margin: 20px;

  @media screen and (min-width: 767px) {
    margin: 20px auto;
    max-width: 960px;
  }
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 1.8px;
  margin-bottom: 20px;
  text-transform: uppercase;

  @media screen and (min-width: 767px) {
    font-size: 39px;
  }
`

const Copy = styled.p`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.8px;
  margin-bottom: 40px;

  @media screen and (min-width: 767px) {
    font-size: 20px;
  }
`

export default NotFoundPage
