import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const BackgroundFooter = (props) => {
  const { animate } = props

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "background-purple.jpg" }) {
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
    <Container animate={animate}>
      <Img
        alt="Textured background image"
        fluid={data.placeholderImage.childImageSharp.fluid}
        objectFit="cover"
        objectPosition="center"
        style={{ position: 'static' }}
      />
    </Container>
  )
}

const Container = styled(motion.div)`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`

export default BackgroundFooter
