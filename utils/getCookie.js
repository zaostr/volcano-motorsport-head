export default (name) => {
  if (process.browser) {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
      )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  } else {
    return undefined
  }
}
