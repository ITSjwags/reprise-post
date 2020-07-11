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
  const sortedEditors = editors.sort(function (a, b) {
    var nameA = a?.node?.shortName.toLowerCase()
    var nameB = b?.node?.shortName.toLowerCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  })

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
          {sortedEditors.map((editor) => {
            const { node } = editor
            const pluralName =
              node?.shortName?.toLowerCase() === 'davis' ? "Davis'" : "Nikki's"
            return (
              <Link
                key={node?.id}
                to={`/work/${node?.shortName?.toLowerCase()}`}
              >
                <EditorName>{node?.name}</EditorName>
                <Img alt={node?.image?.alt} fluid={node?.image?.fluid} />
                <EditorLink to={`/work/${node?.shortName?.toLowerCase()}`}>
                  View {pluralName} work
                </EditorLink>
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
    max-width: 520px;
  }
`

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.tan};
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
  color: ${({ theme }) => theme.colors.tan};
  font-size: 16px;
  letter-spacing: 0.8px;

  @media screen and (min-width: 767px) {
    font-size: 21px;
  }

  > p:not(:last-of-type) {
    line-height: 1.3;
    margin-bottom: 20px;
  }
`

const Team = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8vw;
  margin: 0;
`

const EditorName = styled.h3`
  color: ${({ theme }) => theme.colors.tan};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1.8px;
  margin-bottom: 10px;
  text-align: center;
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
