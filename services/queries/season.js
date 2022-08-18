import gql from 'graphql-tag'

function getSeasonQuery(year = new Date().getFullYear()) {
  const startDatetime = `${year}-01-01T00:00:00.000Z`
  const endDatetime = `${year}-12-31T23:59:59.999Z`
  return {
    query: gql`
      query {
        allSeason(where: {year: {eq: ${year}}}) {
          start_month
          end_month
          standings_url
        }
        allRace(
          sort: [ { datetime: ASC } ],
          where: {
            datetime: {
              gt: "${startDatetime}"
              lt: "${endDatetime}"
            }
          }) {
          _id
          name
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
          }
          serie {
            name
            filter_priority
          }
          datetime
          results {
            _key
            event
            isQualification
            pilotResults {
              _key
              position
              time
              points
            }
          }
        }
        allSerie(where: { season: { year: { eq: ${year} } } }) {
          _id
          name
          results {
            _key
            position
            number
            team
            points
          }
          standings_url
          filter_priority
        }
      }
    `
  }
}

export default getSeasonQuery
