export default {
  replaceProtocol (url) {
    console.log('url', url)

    if (location.protocol === 'https:') {
      return url.replace(/^http:/, 'https:')
    }
    return url
  }
}
