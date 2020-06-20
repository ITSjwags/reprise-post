import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Layout from '../components/layout'

const IndexPage = (props) => {
  const {
    data: {
      datoCmsHomePage: { featuredVideos, seoMetaTags, tagline },
    },
  } = props

  return (
    <Layout>
      <HelmetDatoCms seo={seoMetaTags} />
      <h1>{tagline}</h1>
      <ul>
        {featuredVideos.map((video) => {
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
  query AboutQuery {
    datoCmsHomePage {
      tagline
      featuredVideos {
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

export default IndexPage
