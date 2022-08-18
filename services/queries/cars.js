import gql from 'graphql-tag'

function getCarsPageQuery(locale = 'en') {
  return {
    query: gql`
      query {
        allCarBanner(sort: [{ _updatedAt: DESC }]) {
          _id
          banner {
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
          car {
            _id
            name
            signature
            specification {
              name {
                ${locale}
              }
              value_${locale}Raw
            }
            fullSpecificationLink
            isForSale
            price
          }
          quote {
            text {
              ${locale}
            }
            author
          }
          specification {
            name {
              ${locale}
            }
            value_${locale}Raw
          }
          fullSpecificationLink
        }
      }
    `
  }
}

export default getCarsPageQuery
