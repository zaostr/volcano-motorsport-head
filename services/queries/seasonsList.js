import gql from 'graphql-tag'

function getSeasonsListQuery() {
  return {
    query: gql`
      query {
        allSeason(sort: [{ year: DESC }]) {
          _id
          year
          image {
            asset {
              url
              metadata {
                lqip
              }
            }
          }
        }
      }
    `
  }
}

export default getSeasonsListQuery
