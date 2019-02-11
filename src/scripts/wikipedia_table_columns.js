const fs = require('fs')
const _ = require('lodash')

// This script gets 'technologies' from Wikipedia table columns that have been scraped and put into a txt file.

// Setup — set these constants then run the script

const page_title = 'Timeline of programming languages'
const filename = 'timeline_of_programming_languages.json'
const page_url =
    'https://en.wikipedia.org/wiki/Timeline_of_programming_languages'
const column_number = 2
const scraped_data = '../scraped_pages/timeline_of_programming_languages.txt'

// End setup

// RegExps

const rows = /(?<=(\|\-)).+?(?=(\|\-))/gs
const columns = /(?!(\|))(?!(\s)).+/g
const wiki_link = /(?<=\[\[).*?\|.*?(?=\]\])/
const beginning_brackets = /^\[\[/
const ending_syntax = /\s?(\(|\-|\||#|]).+/
const sharp = /\s+sharp$/i

// End RegExps

const json_output = { page_title, filename, page_url, technologies: [] }

try {
    let text = fs.readFileSync(scraped_data, 'utf8')
    text.match(rows).forEach(row => {
        row.match(columns).forEach((column, i) => {
            // if we're on the selected column number
            if (i + 1 === column_number) {
                // if it's a valid wikipedia link
                if (wiki_link.test(column)) {
                    json_output.technologies.push(format_name(column))
                }
            }
        })
    })

    json_output.technologies = _.sortBy(_.uniq(json_output.technologies))

    fs.writeFileSync(
        `../../lists_by_page/${filename}`,
        JSON.stringify(json_output, null, 4)
    )
} catch (e) {
    console.log('Error:', e.stack)
}

function format_name(column) {
    return column
        .replace(beginning_brackets, '')
        .replace(ending_syntax, '')
        .replace(sharp, '#')
}