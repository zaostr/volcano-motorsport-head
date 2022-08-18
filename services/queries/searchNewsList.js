import gql from 'graphql-tag'

function getSearchNewsListQuery(locale = 'en', params = {}) {
  let { limit, offset } = params
  limit = limit || 12
  offset = offset || 0
  // year = year || new Date().getFullYear()

  // const startDatetime = `${year}-01-01T00:00:00.000Z`
  // const endDatetime = `${year}-12-31T23:59:59.999Z`

  return {
    query: gql`
      query {
        allPost(
          limit: ${limit},
          offset: ${offset},
          sort: [ { publishedAt: DESC } ],
          where: {
            title: { ${locale}: { matches: "${params.searchQuery}" } }
          }
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
        }
        allGallery(
          limit: ${limit},
          offset: ${offset},
          sort: [ { publishedAt: DESC } ],
          where: { title: { ${locale}: { matches: "${params.searchQuery}" } } }
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
          }
        }
      }
    `
  }
}

export default getSearchNewsListQuery
