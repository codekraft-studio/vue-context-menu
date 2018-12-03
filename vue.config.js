module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-context-menu/'
    : '/',
  css: {
    extract: process.env.EXTRACT_CSS === 'true'
  }
}
