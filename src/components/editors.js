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
        companyName
        tagline
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
  const companyName = data?.datoCmsSiteInfo?.companyName
  const tagline = data?.datoCmsSiteInfo?.tagline
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
          <Title>{companyName}</Title>
          <Subtitle>{tagline}</Subtitle>
          <Spacer />
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
                <Editor>
                  <Img alt={node?.image?.alt} fluid={node?.image?.fluid} />
                  <EditorName>
                    {node?.name}
                  </EditorName>
                </Editor>
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
  padding: 30px 0 80px 0;

  @media screen and (min-width: 767px) {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    width: 90%;
    max-width: 1440px;
  }
`

const SiteDetails = styled.div`
  margin-bottom: 20px;
  padding-right: 3vw;

  @media screen and (min-width: 767px) {
    margin-bottom: 0;
    max-width: 860px;
  }
`

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 0.45em;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 767px) {
    font-size: 32px;
    text-align: left;
  }
`

const Subtitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
  text-align: center;

  @media screen and (min-width: 767px) {
    font-size: 22px;
    text-align: left;
  }
`

const Spacer = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  display: block;
  margin: 0 auto 15px;
  width: 50px;

  @media screen and (min-width: 767px) {
    margin: 0 0 15px 0;
  }
`

const Bio = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.02em;

  @media screen and (min-width: 767px) {
    font-size: 22px;
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
    grid-gap: 40px;
    margin-top: 10px;
  }
`
const Editor = styled.div`
  position: relative;
`

const EditorName = styled.h3`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.brown};
  font-size: 12px;
  letter-spacing: 0.2em;
  padding: 9px 19px;
  position: absolute;
  bottom: -16px;
  right: 10px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 767px) {
    bottom: -18px;
    font-size: 15px;
  }
`

export default Editors
