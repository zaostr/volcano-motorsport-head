import gql from 'graphql-tag'

function getRaceQuery(locale = 'en', slug) {
  return {
    query: gql`
      query {
        allRace(where: { slug: { current: { eq: "${slug}" } } }) {
          name
          meta_title {
            ${locale}
          }
          meta_description {
            ${locale}
          }
          serie {
            name
          }
          mainImage {
            asset {
              url
              metadata {
                lqip
              }
            }
            author
            alt_${locale}
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
          datetime
          description_${locale}Raw
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
          results {
            _key
            event
            isQualification
            pilotResults {
              _key
              pilot {
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
              position
              time
              points
            }
          }
          videos
          news {
            __typename
            ... on Gallery {
              _id
              _type
              title {
                ${locale}
              }
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
                alt_${locale}
              }
              publishedAt
              items {
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                  alt_${locale}
                }
              }
            }
            ... on Post {
              _id
              _type
              title {
                ${locale}
              }
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
                alt_${locale}
              }
              publishedAt
            }
          }
          publications_${locale} {
            name
            annotation
            source
            link
          }
        }
      }
    `
  }
}

export default getRaceQuery
