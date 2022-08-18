import gql from 'graphql-tag'

function getGalleryPostQuery(locale = 'en', slug) {
  return {
    query: gql`
      query {
        allGallery(
          where: { slug: { current: { eq: "${slug}" } } }
          limit: 1
        ) {
          _id
          title {
            ${locale}
          }
          slug {
            current
          }
          meta_title {
            ${locale}
          }
          meta_description {
            ${locale}
          }
          mainImage {
            asset {
              url
              metadata {
                lqip
              }
            }
            author
            alt_${locale}
          }
          publishedAt
          items {
            image {
              asset {
                url
                metadata {
                  lqip
                }
              }
              author
              alt_${locale}
            }
            annotation {
              ${locale}
            }
            pilot {
              name
              slug {
                current
              }
            }
          }
        }
      }
    `
  }
}

export default getGalleryPostQuery
