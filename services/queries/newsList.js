import gql from 'graphql-tag'

function getNewsListQuery(locale = 'en', params = {}) {
  let { limit, offset } = params
  limit = limit || 12
  offset = offset || 0
  const startYear = params.year || new Date().getFullYear() - 1
  const endYear = params.year || new Date().getFullYear()

  const startDatetime = `${startYear}-01-01T00:00:00.000Z`
  const endDatetime = `${endYear}-12-31T23:59:59.999Z`

  return {
    query: gql`
      query {
        allPost(
          limit: ${limit},
          offset: ${offset},
          sort: [ { publishedAt: DESC } ],
          where: {
            publishedAt: {
              gt: "${startDatetime}"
              lt: "${endDatetime}"
            }
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
          where: {
            publishedAt: {
              gt: "${startDatetime}"
              lt: "${endDatetime}"
            }
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

export default getNewsListQuery
