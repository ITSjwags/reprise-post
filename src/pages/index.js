import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import Layout from '../components/layout'
import Slider from '../components/slider'
import VideoModal from '../components/video-modal'

const IndexPage = (props) => {
  const {
    data: {
      datoCmsHomePage: { featuredVideos, seoMetaTags, tagline },
    },
  } = props
  const [openVideoDetails, setOpenVideoDetails] = useState({})

  const showModal = () => {
    return Object.keys(openVideoDetails).length !== 0
  }

  const closeModal = () => setOpenVideoDetails({})

  return (
    <AnimatePresence>
      <Layout cover isHome>
        <HelmetDatoCms seo={seoMetaTags} />
        <Content
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Tagline>{tagline}</Tagline>
          <Slider
            slides={featuredVideos}
            openModal={(videoDetails) => setOpenVideoDetails(videoDetails)}
          />
        </Content>

        {!!showModal() && (
          <VideoModal
            onClose={closeModal}
            editor={openVideoDetails?.editor?.name}
            title={openVideoDetails?.title}
            description={openVideoDetails?.description}
            vimeoId={openVideoDetails?.vimeoId}
          />
        )}
      </Layout>
    </AnimatePresence>
  )
}

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

const Tagline = styled.h2`
  font-size: 24px;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 24px 0;
  padding: 0 10px;
  text-align: center;
`

export const query = graphql`
  query AboutQuery {
    datoCmsHomePage {
      tagline
      featuredVideos {
        id
        title
        vimeoId
        description
        thumbnail {
          alt
          fluid {
            width
            tracedSVG
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
        }
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`

export default IndexPage
