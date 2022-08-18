import gql from 'graphql-tag'

function getCareersPageQuery(locale = 'en') {
  return {
    query: gql`
      {
        SiteSettings(id: "siteSettings") {
          careers_image {
            asset {
              url
              metadata {
                lqip
              }
            }
          }
          careers_description_${locale}Raw
        }
        TeamInfo(id: "teamInfo") {
          email_job
          vacancies {
            name {
              ${locale}
            }
            expire_on
            image {
              asset {
                url
                metadata {
                  lqip
                }
              }
            }
            description_${locale}Raw
          }
        }
      }
    `
  }
}
export default getCareersPageQuery
