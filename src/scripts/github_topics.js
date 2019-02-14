const fs = require('fs')
const _ = require('lodash')

// Setup — set these constants then run the script

const filename = 'github_topics'
const url = 'https://github.com/topics'

// End setup

// RegExps

const txt_phrase = /(?<=link-gray-dark">).+(?=<\/p>)/gm

// End RegExps

const json_output = {
    filename: `${filename}.json`,
    url,
    technologies: [],
}

try {
    let text = fs.readFileSync(`../scraped_pages_other/${filename}.txt`, 'utf8')

    text.match(txt_phrase).forEach(phrase => {
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
