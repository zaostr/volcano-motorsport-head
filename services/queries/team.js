import gql from 'graphql-tag'

function getTeamPageQuery(locale = 'en') {
  return {
    query: gql`
      {
        TeamInfo(id: "teamInfo") {
          image {
            asset {
              url
              metadata {
                lqip
              }
            }
          }
          achievements {
            name {
              ${locale}
            }
            value {
              ${locale}
            }
          }
          crew {
            name
            image {
              asset {
                url
                metadata {
                  lqip
                }
              }
            }
            position {
              ${locale}
            }
            joining_date
            qualities {
              name {
                ${locale}
              }
              value
            }
          }
        }
        allPilot {
          name
          slug {
            current
          }
          image {
            asset {
              url
              metadata {
                lqip
              }
            }
          }
        }
        BaseInfo(id: "baseInfo") {
          images {
            asset {
              url
              metadata {
                lqip
              }
            }
          }
          features {
            name {
              ${locale}
            }
            value {
              ${locale}
            }
          }
          description_${locale}Raw
        }
      }
    `
  }
}

export default getTeamPageQuery
