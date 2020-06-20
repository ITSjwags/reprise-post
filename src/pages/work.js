import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Layout from '../components/layout'

const WorkPage = (props) => {
  const {
    data: {
      datoCmsWorkPage: { videos, seoMetaTags },
    },
  } = props

  return (
    <Layout>
      <HelmetDatoCms seo={seoMetaTags} />
      <h1>Dis all da work</h1>
      <ul>
        {videos.map((video) => {
          const { id, videoName, vimeoId } = video
          return (
            <li key={id}>
              <p>{videoName}</p>
              <img src={vimeoId?.thumbnailUrl} alt={vimeoId?.title} />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query WorkQuery {
    datoCmsWorkPage {
      videos {
        id
        shortDescription
        videoName
        vimeoId {
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
