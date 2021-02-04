import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
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

  const showModal = () => {
    return Object.keys(openVideoDetails).length !== 0
  }

  const closeModal = () => setOpenVideoDetails({})

  return (
    <>
      <Helmet>
        <body className="work" />
      </Helmet>
      <Layout isWork>
        <HelmetDatoCms seo={seoMetaTags} htmlAttributes={{ lang: 'en' }} />

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
                      <Description>{title}</Description>
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

const VideoWrapper = styled(motion.div)``

const Videos = styled.ul`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Video = styled.li`
  list-style-type: none;
`

const Trigger = styled.button`
  cursor: pointer;
  display: block;
  height: 100%;
  position: relative;
  width: 100%;

  &:hover {
    > img {
      opacity: 1;
    }
  }
`

const Thumbnail = styled(Img)`
  display: block;
  object-fit: cover;
  width: 100%;
`

const Description = styled.p`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: 11px;
  letter-spacing: 0.2em;
  margin: 0;
  padding: 10px 15px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  text-transform: uppercase;
  width: calc(100% - 20px);

  @media screen and (min-width: 767px) {
    bottom: 20px;
    font-size: 13px;
    left: 20px;
    margin: 0 20px 0 0;
    width: auto;
  }
`

const Play = styled.img`
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 500ms ease;
  height: 75px;
  width: 75px;

  @media screen and (min-width: 767px) {
    /* button hover will change opacity */
    opacity: 0;
    height: auto;
    width: auto;
  }
`

export const query = graphql`
  query WorkQuery {
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
