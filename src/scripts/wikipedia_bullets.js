const fs = require('fs')
const _ = require('lodash')

// This script gets 'technologies' from Wikipedia table columns that have been scraped and put into a txt file.

// Setup — set these constants then run the script

const filename = 'open_source_computing_hardware_partially_open-source_hardware'
const url =
    'https://en.wikipedia.org/wiki/Open-source_computing_hardware#Partially_open-source_hardware'

// End setup

// RegExps

const link_text = /(?<=\*\s?\[\[)(.+?)(?=\]\])/gm
const parentheticals = /\s\(.*$/gm

/*
const rows = /(?<=(\|\-)).+?(?=(\|\-))/gs
const columns = /(?!(\|))(?!(\s)).+/g
const wiki_link = /(?<=\[\[).*?\|?.*?(?=\]\])/
const beginning_brackets = /^.*\[\[/
const ending_syntax_with_space = /\s(\(|\-).+/
const ending_syntax = /(#|]|\|).+/
const sharp = /\s+sharp$/i
*/

// End RegExps

const json_output = {
    filename: `${filename}.json`,
    url,
    technologies: [],
}

try {
    let text = fs.readFileSync(
        `../scraped_pages_bullets/${filename}.txt`,
        'utf8'
    )

    text.match(link_text).forEach(technology => {
        const pipe_location = _.lastIndexOf(technology, '|')

        if (pipe_location > 0) {
            console.log(_.join(_.slice(technology, pipe_location + 1), ''))
            json_output.technologies.push(
                format_name(_.join(_.slice(technology, pipe_location + 1), ''))
            )
        } else {
            console.log(technology)
            json_output.technologies.push(format_name(technology))
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
    return technology.replace(parentheticals, '')
}
