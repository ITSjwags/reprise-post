import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import styled from 'styled-components'

const Background = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "bg-white.png" }) {
        childImageSharp {
          fluid(maxWidth: 3840, quality: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
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
        style={{ height: 'calc(100 * var(--vh))', minHeight: '100%' }}
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

export default Background
