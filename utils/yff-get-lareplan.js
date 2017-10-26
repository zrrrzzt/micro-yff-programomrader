'use strict'

const axios = require('axios')
const cheerio = require('cheerio')
const baseUrl = 'https://data.udir.no'

module.exports = async url => {
  console.log(`retreiving lareplan from ${url}`)
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)
  const title = $('h1').text().trim()
  const article = $('.article-content')
  const linksObject = $(article).find('a')
  const links = Object.keys(linksObject).map(key => linksObject[key]).filter(line => line.type === 'tag')
  const filtered = links.filter(link => /programfag/.test($(link).text()) || /opplæring/.test($(link).text()) || /faget/.test($(link).text()))
  const link = filtered.length > 0 ? filtered[0] : false
  return {
    name: title,
    url: link !== false ? `${baseUrl}${link.attribs.href}` : false
  }
}
