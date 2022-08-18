export default function({ app }) {
  app.store.commit('SET_LOCALE', app.i18n.locale)

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    // TODO: reload all API resources here???
    app.store.commit('SET_LOCALE', newLocale)
  }
}
