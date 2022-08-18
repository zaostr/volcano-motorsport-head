// TODO: why don't use .env config
const SANITY_DATASET = 'production'
const SANITY_PROJECT_ID = '0dvewhli'
const HEADLESS_CMS_ENDPOINT = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${SANITY_DATASET}/default`

export { SANITY_DATASET, SANITY_PROJECT_ID, HEADLESS_CMS_ENDPOINT }
