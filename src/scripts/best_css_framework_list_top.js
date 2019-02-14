const fs = require('fs')
const _ = require('lodash')

// This script gets 'technologies' from Wikipedia categories that have been scraped and put into a txt file.

// Setup — set these constants then run the script

const filename = 'best_css_framework_list_bottom'
const url = 'https://sitecake.com/resources/css-frameworks.html'

// End setup

// RegExps

const txt_phrase = /(?<=\/\/\s).+/gm

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

    json_output.technologies = _.uniq(json_output.technologies)

    fs.writeFileSync(
        `../../lists_by_page/${filename}.json`,
        JSON.stringify(json_output, null, 4)
    )
} catch (e) {
    console.log('Error:', e.stack)
}
