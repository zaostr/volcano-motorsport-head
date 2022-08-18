import gql from 'graphql-tag'

function getIndexDataQuery(locale = 'en') {
  const currentDatetime = new Date().toISOString()

  return {
    query: gql`
    {
      SiteSettings(id: "siteSettings") {
        index_video
        index_image {
          asset {
            url
            metadata {
              lqip
            }
          }
          crop {
            top
            right
            bottom
            left
          }
          hotspot {
            height
            width
            x
            y
          }
        }
        index_banner {
          name {
            ${locale}
          }
          text {
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
        }
        instagram_link,
        instagram_access_token
      }
      futureRaces: allRace(
        where: {datetime: {gt: "${currentDatetime}"}}
        sort: [ { datetime: ASC } ]
        limit: 1) {
        _id
        name
        place
        datetime
        slug {
          current
        }
      }
      pastOrCurrentRaces: allRace(
        where: {datetime: {lt: "${currentDatetime}"}}
        sort: [ { datetime: DESC } ]
        limit: 1) {
        _id
        name
        place
        datetime
        slug {
          current
        }
        schedule {
          _key
          event
          isQualification
          datetime
          pilots {
            _id
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
        }
      }
      TeamInfo(id: "teamInfo") {
        partners {
          name
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
    }
  `
  }
}

export default getIndexDataQuery
