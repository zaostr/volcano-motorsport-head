import gql from 'graphql-tag'

function getAllNewsListQuery(locale = 'en') {
  const limit = 10000 // some huge amount

  return {
    query: gql`
      query {
        allPost(
          limit: ${limit},
          sort: [ { publishedAt: DESC } ]
        ) {
          _id
          title {
            ${locale}
          }
          slug {
            current
          }
          mainImage {
            asset {
              url
              metadata {
                lqip
              }
            }
            alt_${locale}
          }
          body_${locale}Raw
          publishedAt
        }
        allGallery(
          limit: ${limit},
          sort: [ { publishedAt: DESC } ],
        ) {
          _id
          title {
            ${locale}
          }
          slug {
            current
          }
          mainImage {
            asset {
              url
              metadata {
                lqip
              }
            }
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
              alt_${locale}
            }
            annotation {
              ${locale}
            }
          }
        }
      }
    `
  }
}

export default getAllNewsListQuery
