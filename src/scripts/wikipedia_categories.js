const fs = require('fs')
const _ = require('lodash')

// This script gets 'technologies' from Wikipedia categories that have been scraped and put into a txt file.

// Setup — set these constants then run the script

const filename = 'category_python_web_frameworks'
const url =
    'https://en.wikipedia.org/wiki/Category:Python_web_frameworks#Pages_in_category'

// End setup

// RegExps

const txt_words = /^.+$/gm
const parentheticals = /\s\(.*$/gm
const sharp = /\s+sharp$/i

// End RegExps

const json_output = {
    filename: `${filename}.json`,
    url,
    technologies: [],
}

try {
    let text = fs.readFileSync(
        `../scraped_pages_categories/${filename}.txt`,
        'utf8'
    )

    text.match(txt_words).forEach(technology => {
        json_output.technologies.push(format_name(technology))
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

function format_name(technology) {
    return technology.replace(parentheticals, '').replace(sharp, '#')
}
