import gql from 'graphql-tag'

function getWallpapersQuery(locale = 'en') {
  return {
    query: gql`
      {
        allWallpaper {
          _id
          name {
            ${locale}
          }
          pilot {
            name
          }
          image {
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
        }
        SiteSettings(id: "siteSettings") {
          wallpaper_resolutions {
            _key
            title {
              ${locale}
            }
            width
            height
          }
        }
      }
    `
  }
}
export default getWallpapersQuery
