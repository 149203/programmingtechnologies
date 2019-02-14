const fs = require('fs')
const _ = require('lodash')

// Setup — set these constants then run the script

const filename = 'tiobe_index_programming_languages_canonical'
const url =
    'https://www.tiobe.com/tiobe-index/programming-languages-definition/#instances'

// End setup

// RegExps

const txt_phrase = /^.+$/gm
const phrase_with_colon = /.+:.+/
const parenthetical = /\s\(.*?\)/gm
const colon = /:/gm
const new_line_or_comma = /\n|,\s/gm

// End RegExps

const json_output = {
    filename: `${filename}.json`,
    url,
    technologies: [],
}

try {
    let text = fs.readFileSync(`../scraped_pages_other/${filename}.txt`, 'utf8')

    text.match(txt_phrase).forEach(phrase => {
        if (phrase_with_colon.test(phrase)) {
            const canonical_phrase = phrase.slice(0, _.indexOf(phrase, ':'))
            console.log(canonical_phrase)
            json_output.technologies.push(canonical_phrase)
        } else {
            console.log(phrase)
            json_output.technologies.push(phrase)
        }
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
    return technology.replace(parenthetical, '').replace(colon, ',')
}
