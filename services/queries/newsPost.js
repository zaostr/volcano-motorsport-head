import gql from 'graphql-tag'

function getNewsPostQuery(locale = 'en', slug) {
  return {
    query: gql`
      query {
        allPost(
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
          body_${locale}Raw
        }
      }
    `
  }
}

export default getNewsPostQuery
