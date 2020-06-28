import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import styled from 'styled-components'

const BackgroundFooter = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "background-purple.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Img
        alt="Textured background image"
        fluid={data.placeholderImage.childImageSharp.fluid}
        objectFit="fill"
        objectPosition="top"
        style={{ height: '100vh' }}
      />
    </Container>
  )
}

const Container = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`

export default BackgroundFooter
