import gql from 'graphql-tag'

function getContactsPageQuery(locale = 'en') {
  return {
    query: gql`
      {
        BaseInfo(id: "baseInfo") {
          address {
            ${locale}
          }
          geopoint {
            lat
            lng
          }
        }
        TeamInfo(id: "teamInfo") {
          email_sale
        }
      }
    `
  }
}

export default getContactsPageQuery
