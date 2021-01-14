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
            shortName
            image {
              alt
              fluid {
                aspectRatio
                base64
                height
                sizes
                src
                srcSet
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
  const filteredEditors = editors.filter(({node}) => node?.shortName?.toLowerCase() !== 'heather')

  return (
    <AnimatePresence>
      <Container
        key="editors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        <SiteDetails>
          <Title>
            <span>((</span>REPRISE POST<span>))</span>
          </Title>
          <Bio
            dangerouslySetInnerHTML={{
              __html: bio,
            }}
          />
        </SiteDetails>
        <Team>
          {filteredEditors.map((editor) => {
            const { node } = editor
            return (
              <Link
                key={node?.id}
                to={`/work/${node?.shortName?.toLowerCase()}`}
              >
                <EditorName>
                  {node?.name}
                </EditorName>
                <Img alt={node?.image?.alt} fluid={node?.image?.fluid} />
              </Link>
            )
          })}
        </Team>
      </Container>
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  margin: 0 auto;
  padding: 40px 0 20px 0;

  @media screen and (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    width: 90%;
    max-width: 1440px;
  }
`

const SiteDetails = styled.div`
  margin-bottom: 20px;
  padding-right: 3vw;

  @media screen and (min-width: 767px) {
    margin-bottom: 0;
    max-width: 470px;
  }
`

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 1.8px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;

  > span {
    font-weight: normal;
    letter-spacing: 3.8px;
    padding: 0 2px;
  }

  @media screen and (min-width: 767px) {
    font-size: 39px;
    text-align: left;
  }
`

const Bio = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.8px;

  @media screen and (min-width: 767px) {
    font-size: 20px;
  }

  > p {
    line-height: 1.3;
  }

  > p:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const Team = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 0;
  max-width: 700px;

  @media screen and (min-width: 767px) {
    grid-gap: 8vw;
  }
`

const EditorName = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1.8px;
  margin-bottom: 10px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 767px) {
    font-size: 28px;
  }
`

export default Editors
