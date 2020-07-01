import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
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
        <SiteDetails>
          <Title>((REPRISE POST))</Title>
          <Bio
            dangerouslySetInnerHTML={{
              __html: bio,
            }}
          />
        </SiteDetails>
        <Team>
          {editors.map((editor) => {
            const { node } = editor
            const pluralName =
              node?.name?.toLowerCase() === 'davis' ? "Davis'" : "Nikki's"
            return (
              <div key={node?.id}>
                <EditorName>{node?.name}</EditorName>
                <Img alt={node?.image?.alt} fluid={node?.image?.fluid} />
                <EditorLink
                  to={`/work/${node?.name?.toLowerCase()}`}
                  activeClassName="is-active"
                >
                  View {pluralName} work
                </EditorLink>
              </div>
            )
          })}
        </Team>
      </Container>
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  margin: 0 auto;
  padding: 20px 0;

  @media screen and (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 90%;
  }
`

const SiteDetails = styled.div`
  margin-bottom: 20px;
  padding-right: 3vw;
  max-width: 520px;

  @media screen and (min-width: 767px) {
    margin-bottom: 0;
  }
`

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.tan};
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 1.8px;
  margin-bottom: 20px;
  text-transform: uppercase;

  @media screen and (min-width: 767px) {
    font-size: 39px;
  }
`

const Bio = styled.div`
  color: ${({ theme }) => theme.colors.tan};

  > p:not(:last-of-type) {
    line-height: 1.3;
    margin-bottom: 20px;
  }
`

const Team = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5vw;
  margin: 0;
`

const EditorName = styled.h3`
  color: ${({ theme }) => theme.colors.tan};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1.8px;
  margin-bottom: 10px;
  text-transform: uppercase;

  @media screen and (min-width: 767px) {
    font-size: 30px;
  }
`

const EditorLink = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.tan};
  color: ${({ theme }) => theme.colors.tan};
  display: block;
  font-weight: normal;
  font-size: 10px;
  letter-spacing: 1.8;
  margin: 20px 0;
  padding: 5px 10px;
  text-align: center;
  text-transform: uppercase;
  transition: all 250ms ease;
  white-space: nowrap;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.tan};
    color: ${({ theme }) => theme.colors.purple};
  }

  @media screen and (min-width: 767px) {
    font-size: 22px;
    margin: 10px 0;
  }
`

export default Editors
