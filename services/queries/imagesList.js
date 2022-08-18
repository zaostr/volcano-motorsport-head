import gql from 'graphql-tag'

function getImagesListQuery(imagesIdsString) {
  return {
    query: gql`
      query {
        allSanityImageAsset(
          where: {
            _id: {
              in: [
                "${imagesIdsString}"
              ]
            }
          }
        ) {
          _id
          url
          metadata {
            lqip
          }
        }
      }
    `
  }
}

export default getImagesListQuery
