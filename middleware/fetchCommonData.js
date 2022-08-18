export default async function({ store }) {
  await store.dispatch('fetchCommonData', store.state.locale)
}
