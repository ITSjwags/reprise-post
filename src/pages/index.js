import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import Layout from '../components/layout'
import Slider from '../components/slider'
import VideoModal from '../components/video-modal'

const IndexPage = (props) => {
  const {
    data: {
      datoCmsHomePage: { featuredVideos, seoMetaTags },
    },
  } = props
  const [openVideoDetails, setOpenVideoDetails] = useState({})
  const filteredFeaturedVideos = featuredVideos.filter(video => video?.editor?.shortName.toLowerCase() !== 'heather')

  const showModal = () => {
    return Object.keys(openVideoDetails).length !== 0
  }

  const closeModal = () => setOpenVideoDetails({})

  return (
    <AnimatePresence exitBeforeEnter>
      <Layout cover isHome>
        <HelmetDatoCms seo={seoMetaTags} htmlAttributes={{ lang: 'en' }} />

        <Content>
          <Slider
            slides={filteredFeaturedVideos}
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

export const query = graphql`
  query AboutQuery {
    datoCmsHomePage {
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
