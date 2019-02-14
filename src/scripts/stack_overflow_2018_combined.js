const fs = require('fs')
const _ = require('lodash')

// This script gets 'technologies' from Wikipedia categories that have been scraped and put into a txt file.

// Setup — set these constants then run the script

const filename = 'stack_overflow_2018_developers_survey'
const url = 'https://insights.stackoverflow.com/survey/2018/'

const file_folder = '../../lists_from_stack_overflow_2018_developer_survey'

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
    fs.readdirSync(file_folder).forEach(file => {
        let scraped_tech = JSON.parse(
            fs.readFileSync(`${file_folder}/${file}`, 'utf8')
        )
        scraped_tech.technologies.forEach(technology => {
            json_output.technologies.push(technology)
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
