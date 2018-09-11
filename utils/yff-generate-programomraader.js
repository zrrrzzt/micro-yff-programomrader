const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const getLareplan = require('./yff-get-lareplan')
const getKompetansemal = require('./yff-get-kompetansemal')
const baseUrl = 'https://www.udir.no/kl06'
const basePath = 'src/data'
const programmer = require('../src/data/utdanningsprogrammer.json')
const query = process.argv[2]
const selectors = {
  'vg3': '.fromThirdYear',
  'vg2': '.programArea',
  'vg1': '.programTitle'
}
const specials = {
  'vg3': {
    selector: '.oneYear',
    testCase: '3'
  },
  'vg2': false,
  'vg1': false
}

async function getPage (url) {
  const { data } = await axios.get(url)
  return data
}

async function getData (options) {
  const lareplan = await getLareplan(options.programUrl)
  const kompetansemaal = lareplan.url ? await getKompetansemal(lareplan.url) : false
  console.log(options.programUrl)
  console.log(lareplan)
  return {
    id: options.programId,
    name: lareplan.name,
    programUrl: options.programUrl,
    lareplanUrl: lareplan.url,
    kompetansemaal: kompetansemaal
  }
}

async function parsePage (options) {
  const data = await getPage(options.url)
  const $ = cheerio.load(data)
  const omrader = $(options.selector)
  const special = options.special
  let omradeIds = []
  let omradeContent = []

  omrader.each((i, element) => {
    const programId = element.attribs['data-programid']
    const programUrl = `${baseUrl}/${programId}`
    if (!omradeIds.includes(programId)) {
      omradeIds.push(programId)
      omradeContent.push({ programId: programId, programUrl: programUrl })
    }
  })

  if (special) {
    const boxes = $(special.selector)
    boxes.each((i, element) => {
      const programId = element.attribs['data-programid']
      const programUrl = `${baseUrl}/${programId}`
      const testCase = new RegExp(special.testCase)
      if (testCase.test(programId) && !omradeIds.includes(programId)) {
        omradeIds.push(programId)
        omradeContent.push({ programId: programId, programUrl: programUrl })
      }
    })
  }

  const jobs = omradeContent.map(getData)

  const results = await Promise.all(jobs)

  return JSON.stringify(results, null, 2)
}

async function generateOmrade (options) {
  const selector = selectors[options.level]
  const special = specials[options.level]
  const data = await parsePage({ url: options.url, selector: selector, special: special })
  const fileName = `${basePath}/${options.id.toLocaleLowerCase()}-${options.level}.json`
  fs.writeFileSync(fileName, data, 'utf-8')
  console.log(`written ${fileName}`)
}

async function generateOmrader (level) {
  const omrader = programmer.map(line => Object.assign(line, { level: level }))
  const jobs = omrader.map(generateOmrade)
  await Promise.all(jobs)
  console.log('finished')
  process.exit(0)
}

generateOmrader(query)
