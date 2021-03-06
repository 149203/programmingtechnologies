const fs = require('fs')
const _ = require('lodash')

// Setup — set these constants then run the script

const filename = 'comparison_of_programming_languages_general_comparison'
const url =
    'https://en.wikipedia.org/wiki/Comparison_of_programming_languages#General_comparison'
const column_number = 2

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
    let text = fs.readFileSync(
        `../scraped_pages_tables/${filename}.txt`,
        'utf8'
    )
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
