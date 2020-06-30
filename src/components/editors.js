import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const Editors = () => {
  const data = useStaticQuery(graphql`
    query Editors {
      datoCmsSiteInfo {
        bio
      }
      allDatoCmsEditor {
        edges {
          node {
            id
            name
            image {
              alt
              fluid {
                aspectRatio
                base64
                height
                sizes
                src
                srcSet
                tracedSVG
                width
              }
            }
          }
        }
      }
    }
  `)

  const bio = data?.datoCmsSiteInfo?.bio
  const editors = data?.allDatoCmsEditor?.edges
  console.log(editors)

  return (
    <AnimatePresence>
      <Container
        key="editors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Bio
          dangerouslySetInnerHTML={{
            __html: bio,
          }}
        />
        <div>
          {editors.map((editor) => {
            const { node } = editor
            return <li key={node?.id}>{node?.name}</li>
          })}
        </div>
      </Container>
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  margin: 0 auto;
  padding: 20px 0;
  max-width: 90%;

  @media screen and (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
  }
`

const Bio = styled.div`
  color: ${({ theme }) => theme.colors.tan};
`

export default Editors
