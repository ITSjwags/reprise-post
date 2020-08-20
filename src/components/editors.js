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
          {editors.map((editor) => {
            const { node } = editor
            const pluralName =
              node?.shortName?.toLowerCase() === 'davis'
                ? "Davis'"
                : `${node?.shortName}'s`
            return (
              <Link
                key={node?.id}
                to={`/work/${node?.shortName?.toLowerCase()}`}
              >
                <EditorName
                  small={node?.shortName?.toLowerCase() === 'heather'}
                >
                  {node?.name.split(' ')[0]}
                  <br />
                  {node?.name.split(' ')[1]}
                </EditorName>
                <Img alt={node?.image?.alt} fluid={node?.image?.fluid} />
                <EditorLinkText>{pluralName} work</EditorLinkText>
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

  @media screen and (min-width: 960px) {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    width: 90%;
    max-width: 1440px;
  }
`

const SiteDetails = styled.div`
  margin-bottom: 20px;
  padding-right: 3vw;

  @media screen and (min-width: 960px) {
    margin-bottom: 0;
    max-width: 470px;
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

  @media screen and (min-width: 960px) {
    font-size: 39px;
    text-align: left;
  }
`

const Bio = styled.div`
  color: ${({ theme }) => theme.colors.tan};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.8px;

  @media screen and (min-width: 960px) {
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

  @media screen and (min-width: 960px) {
    grid-gap: 1.3vw;
    grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
  }
`

const EditorName = styled.h3`
  color: ${({ theme }) => theme.colors.tan};
  font-size: ${({ small }) => (small ? '17px' : '20px')};
  font-weight: bold;
  letter-spacing: 1.8px;
  margin-bottom: 10px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 960px) {
    font-size: 28px;
  }
`

const EditorLinkText = styled.p`
  border: 2px solid ${({ theme }) => theme.colors.tan};
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

  @media screen and (min-width: 960px) {
    font-size: 22px;
    margin: 10px 0;
  }
`

export default Editors
