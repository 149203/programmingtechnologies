const fs = require('fs')
const _ = require('lodash')

// This script gets 'technologies' from Wikipedia categories that have been scraped and put into a txt file.

// Setup — set these constants then run the script

const filename = 'stack_overflow_2018_most_wanted_platforms'
const url =
    'https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-platforms'

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

    let phrases = _.split(text, '\n')

    _.remove(phrases, (phrase, i) => {
        return (i + 1) % 2 === 0 // removes from phrases if true (the even-number rows from the txt file)
    })

    phrases.forEach(phrase => {
        console.log(phrase)
        json_output.technologies.push(_.replace(phrase, /\r/gm, ''))
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
