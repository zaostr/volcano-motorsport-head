import gql from 'graphql-tag'

// get data to form dynamic routes for 'nuxt generate' command
function getDynamicSourcesQuery() {
  return {
    query: gql`
      query {
        allSeason {
          year
        }
        allPost {
          publishedAt
          slug {
            current
          }
        }
        allGallery {
          publishedAt
          slug {
            current
          }
        }
        allRace {
          datetime
          slug {
            current
          }
        }
        allPilot {
          slug {
            current
          }
        }
      }
    `
  }
}

export default getDynamicSourcesQuery
