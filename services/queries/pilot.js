import gql from 'graphql-tag'

function getPilotQuery(locale = 'en', slug) {
  return {
    query: gql`
      {
        allPilot(
          where: { slug: { current: { eq: "${slug}" } } }
          limit: 1
        ) {
          name
          meta_title {
            ${locale}
          }
          meta_description {
            ${locale}
          }
          image {
            asset {
              url
              metadata {
                lqip
              }
            }
          }
          description_${locale}Raw
          career_table {
            year
            body_${locale}Raw
          }
          characteristics {
            name {
              ${locale}
            }
            value {
              ${locale}
            }
          }
          socials
          web_site
        }
      }
    `
  }
}

export default getPilotQuery
