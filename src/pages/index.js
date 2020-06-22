import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import Layout from '../components/layout'
import Slider from '../components/slider'

const IndexPage = (props) => {
  const {
    data: {
      datoCmsHomePage: { featuredVideos, seoMetaTags, tagline },
    },
  } = props

  return (
    <AnimatePresence>
      <Layout cover>
        <HelmetDatoCms seo={seoMetaTags} />
        <Content
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Tagline>{tagline}</Tagline>
          <Slider slides={featuredVideos} />
        </Content>
      </Layout>
    </AnimatePresence>
  )
}

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const Tagline = styled.h2`
  font-size: 24px;
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
        shortDescription
        videoName
        vimeoLink {
          height
          providerUid
          thumbnailUrl
          title
          width
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
