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
    <AnimatePresence exitBeforeEnter>
      <Layout cover isHome>
        <HelmetDatoCms seo={seoMetaTags} htmlAttributes={{ lang: 'en' }} />
        <Content>
          <Tagline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {tagline}
          </Tagline>
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

const Tagline = styled(motion.h2)`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 24px 0;
  padding: 0 10px;
  text-align: center;

  @media screen and (min-width: 767px) {
    font-size: 24px;
  }
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

export default IndexPage
