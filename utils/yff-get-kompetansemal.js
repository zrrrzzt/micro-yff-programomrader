const axios = require('axios')

function getKompetanseMaal (prev, current) {
  current.kompetansemaal.forEach(maal => prev.push(maal))
  return prev
}

module.exports = async url => {
  const { data } = await axios.get(url)
  // const kompetansemaal = data['kompetansemaal-kapittel'].kompetansemaalsett[0].kompetansemaal
  const kompetansemaal = data['kompetansemaal-kapittel'].kompetansemaalsett.reduce(getKompetanseMaal, [])
  console.log(`Retreiving kompetansemaal from ${url}`)
  return kompetansemaal
}
