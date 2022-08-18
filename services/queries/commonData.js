import gql from 'graphql-tag'

function getCommonDataQuery(locale = 'en') {
  return {
    query: gql`
    {
      SiteSettings(id: "siteSettings") {
        meta_title {
          ${locale}
        }
        meta_description {
          ${locale}
        }
        meta_image {
          asset {
            url
          }
        }
        is_frontend_closed
        maintenance_message {
          ${locale}
        }
      }
      TeamInfo(id: "teamInfo") {
        name
        slogan {
          ${locale}
        }
        establishment_date
        phone
        email
        email_sale
        socials
      }
    }
  `
  }
}

export default getCommonDataQuery
