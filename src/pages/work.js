import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import Layout from '../components/layout'
import VideoModal from '../components/video-modal'
import playSrc from '../images/icon-play.svg'

const WorkPage = (props) => {
  const {
    data: {
      datoCmsWorkPage: { videos, seoMetaTags },
      allDatoCmsEditor: { edges: editors },
    },
    pageContext: { editor: editorFromUrl },
  } = props

  const [openVideoDetails, setOpenVideoDetails] = useState({})

  const limitedVideos = videos.filter(video => video?.editor?.shortName.toLowerCase() !== 'heather')
  const filteredVideos = !!editorFromUrl
    ? limitedVideos.filter(
        (video) =>
          video?.editor?.shortName.toLowerCase() === editorFromUrl.toLowerCase()
      )
    : limitedVideos
  const filteredEditors = editors.filter(({node}) => node?.shortName?.toLowerCase() !== 'heather')

  const showModal = () => {
    return Object.keys(openVideoDetails).length !== 0
  }

  const closeModal = () => setOpenVideoDetails({})

  return (
    <>
      <Helmet>
        <body className="work" />
      </Helmet>
      <Layout>
        <HelmetDatoCms seo={seoMetaTags} htmlAttributes={{ lang: 'en' }} />
        <div>
          <FilterRow>
            <FilterButton to="/work" activeClassName="is-active">
              All work
            </FilterButton>

            {filteredEditors.map((editor) => {
              return (
                <FilterButton
                  to={`/work/${editor?.node?.shortName?.toLowerCase()}`}
                  activeClassName="is-active"
                  partiallyActive
                >
                  {editor?.node?.name}
                </FilterButton>
              )
            })}
          </FilterRow>
        </div>
        <AnimatePresence exitBeforeEnter>
          <VideoWrapper
            key="work"
            initial={{ y: -15 }}
            animate={{ y: 0 }}
            exit={{ y: 0 }}
            transition={{ ease: 'easeOut', delay: 0.1 }}
          >
            <Videos>
              {filteredVideos.map((video) => {
                const {
                  editor,
                  id,
                  description,
                  title,
                  thumbnail,
                  vimeoId,
                } = video
                return (
                  <Video key={id}>
                    <Trigger
                      onClick={() =>
                        setOpenVideoDetails({
                          editor,
                          description,
                          title,
                          vimeoId,
                        })
                      }
                    >
                      <Thumbnail fluid={thumbnail.fluid} alt={thumbnail.alt} />
                      <Play src={playSrc} alt="play icon" />
                    </Trigger>
                  </Video>
                )
              })}
            </Videos>
          </VideoWrapper>
        </AnimatePresence>

        {showModal() && (
          <VideoModal
            onClose={closeModal}
            editor={openVideoDetails?.editor?.name}
            title={openVideoDetails?.title}
            description={openVideoDetails?.description}
            vimeoId={openVideoDetails?.vimeoId}
          />
        )}
      </Layout>
    </>
  )
}

const FilterRow = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;

  @media screen and (min-width: 767px) {
    flex-direction: row;
    margin: 0 auto 4px;
    max-width: 960px;
  }
`

const FilterButton = styled(Link)`
  border: 2px solid ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.brown};
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 1.8;
  margin: 5px 10px;
  padding: 5px 10px;
  text-align: center;
  text-transform: uppercase;
  transition: all 250ms ease;
  white-space: nowrap;
  width: 100%;

  &:hover,
  &.is-active {
    background: ${({ theme }) => theme.colors.brown};
    color: ${({ theme }) => theme.colors.white};
  }

  @media screen and (min-width: 767px) {
    font-size: 22px;
    margin: 0 20px;
  }
`

const VideoWrapper = styled(motion.div)``

const Videos = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: 0;
  padding: 20px;

  @media screen and (min-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Video = styled.li`
  list-style-type: none;
`

const Trigger = styled.button`
  cursor: pointer;
  height: 100%;
  position: relative;
  width: 100%;

  &:hover {
    > img {
      opacity: 1;
    }
  }
`

const Play = styled.img`
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 500ms ease;

  @media screen and (min-width: 767px) {
    /* button hover will change opacity */
    opacity: 0;
  }
`

const Thumbnail = styled(Img)`
  display: block;
  object-fit: cover;
  width: 100%;
`

export const query = graphql`
  query WorkQuery {
    allDatoCmsEditor {
      edges {
        node {
          name
          shortName
        }
      }
    }
    datoCmsWorkPage {
      videos {
        id
        title
        vimeoId
        description
        thumbnail {
          alt
          fluid {
            width
            srcSet
            src
            sizes
            height
            base64
            aspectRatio
          }
        }
        editor {
          name
          shortName
        }
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`

export default WorkPage
