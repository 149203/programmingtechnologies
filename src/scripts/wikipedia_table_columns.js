const fs = require('fs')
const _ = require('lodash')

// This script gets 'technologies' from Wikipedia table columns that have been scraped and put into a txt file.

// Setup — set these constants then run the script

const filename = 'list_of_rich_internet_application_frameworks'
const url =
    'https://en.wikipedia.org/wiki/List_of_rich_Internet_application_frameworks'
const column_number = 1

// End setup

// RegExps

const rows = /(?<=(\|\-)).+?(?=(\|\-))/gs
const columns = /(?!(\|))(?!(\s)).+/g
const wiki_link = /(?<=\[\[).*?\|?.*?(?=\]\])/
const beginning_brackets = /^.*\[\[/
const ending_syntax_with_space = /\s(\(|\-).+/
const ending_syntax = /(#|]|\|).+/
const sharp = /\s+sharp$/i

// End RegExps

const json_output = {
    filename: `${filename}.json`,
    url,
    technologies: [],
}

try {
    let text = fs.readFileSync(`../scraped_pages/${filename}.txt`, 'utf8')
    text.match(rows).forEach(row => {
        row.match(columns).forEach((column, i) => {
            // if we're on the selected column number
            if (i + 1 === column_number) {
                console.log(column)
                // if it's a valid wikipedia link
                if (wiki_link.test(column)) {
                    json_output.technologies.push(format_name(column))
                }
            }
        })
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

function format_name(column) {
    return column
        .replace(beginning_brackets, '')
        .replace(ending_syntax_with_space, '')
        .replace(ending_syntax, '')
        .replace(sharp, '#')
}
