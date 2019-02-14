const fs = require('fs')
const _ = require('lodash')

// Setup — set these constants then run the script

const filename = 'tiobe_top_50_to_100_languages'
const url = 'https://www.tiobe.com/tiobe-index/'

// End setup

// RegExps

// End RegExps

const json_output = {
    filename: `${filename}.json`,
    url,
    technologies: [],
}

try {
    let text = fs.readFileSync(`../scraped_pages_other/${filename}.txt`, 'utf8')

    const phrases = _.split(text, ', ')

    phrases.forEach(phrase => {
        console.log(phrase)
        json_output.technologies.push(phrase)
    })

    json_output.technologies = _.sortBy(
        _.uniq(json_output.technologies),
        technology => _.toLower(technology)
    )

    fs.writeFileSync(
        `../../lists_by_page/${filename}.json`,
        JSON.stringify(json_output, null, 4)
    )
} catch (e) {
    console.log('Error:', e.stack)
}
