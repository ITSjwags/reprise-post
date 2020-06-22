import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import Layout from '../components/layout'

const WorkPage = (props) => {
  const {
    data: {
      datoCmsWorkPage: { videos, seoMetaTags },
    },
  } = props

  return (
    <AnimatePresence>
      <Layout>
        <HelmetDatoCms seo={seoMetaTags} />
        <Content
          key="work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Videos>
            {videos.map((video) => {
              const { id, vimeoLink } = video
              return (
                <Video key={id}>
                  <Thumbnail
                    src={vimeoLink?.thumbnailUrl}
                    alt={vimeoLink?.title}
                  />
                </Video>
              )
            })}
          </Videos>
        </Content>
      </Layout>
    </AnimatePresence>
  )
}

const Content = styled(motion.div)``

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

const Thumbnail = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
`

export const query = graphql`
  query WorkQuery {
    datoCmsWorkPage {
      videos {
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
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`

export default WorkPage
