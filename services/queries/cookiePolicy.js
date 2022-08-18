import gql from 'graphql-tag'

function getCookiePolicyPageQuery(locale = 'en') {
  return {
    query: gql`
      {
        SiteSettings(id: "siteSettings") {
          cookie_policy_${locale}Raw
          cookie_policy_updatedAt
        }
      }
    `
  }
}

export default getCookiePolicyPageQuery
