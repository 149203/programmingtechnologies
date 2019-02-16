const fs = require('fs')
const _ = require('lodash')

// Setup — set these constants then run the script

const folder = '../../lists_to_weight_popularity'

const folder_files = [
    { filename: 'javascript.json', popularity: 60 },
    { filename: 'stack_overflow_2018_developers_survey.json', popularity: 50 },
    { filename: 'github_topics.json', popularity: 40 },
    { filename: 'tiobe_index_top_50.json', popularity: 40 },
    { filename: 'list_of_javascript_libraries.json', popularity: 30 },
    { filename: 'wikipedia_solution_stack.json', popularity: 30 },
    { filename: 'best_css_framework_list_top.json', popularity: 30 },
    { filename: 'tiobe_top_50_to_100_languages.json', popularity: 20 },
    { filename: 'tiobe_index_languages_canonical.json', popularity: 20 },
]

// End setup

// Create one big array of objects with all duplicates
// Filter out exact duplicates
// Console.log a list of difference in casing
// Manually remove the duplicates that are a lower popularity

let json_output = []

try {
    fs.readdirSync(folder).forEach(json_file => {
        let parsed_file = JSON.parse(
            fs.readFileSync(`${folder}/${json_file}`, 'utf8')
        )
        parsed_file.technologies.forEach(technology => {
            const tech_obj = {}
            tech_obj.name = technology
            folder_files.forEach(file => {
                if (file.filename === json_file) {
                    tech_obj.popularity = file.popularity
                }
            })

            json_output.push(tech_obj)
        })
    })

    const json_output_ordered = _.orderBy(
        json_output,
        ['popularity', json_output => _.toLower(json_output.name)],
        ['desc', 'asc']
    )

    const json_output_no_exact_dupes = _.uniqBy(
        json_output_ordered,
        tech => tech.name
    )

    const close_dupes = json_output_no_exact_dupes.filter((tech, i, arr) => {
        let result = []
        arr.filter(other_tech => {
            if (
                // if there is a capitalization difference in a name
                _.toLower(tech.name) === _.toLower(other_tech.name) &&
                tech.name !== other_tech.name
            ) {
                result.push(tech, other_tech)
            }
        })
        return Array.isArray(result) && result.length
    })

    if (!Array.isArray(close_dupes) || close_dupes.length) {
        // view capitalization differences in names and correct them in the JSON file
        console.log(
            'Correct the capitalization in these duplicates:',
            close_dupes
        )
        throw new Error('YOU HAVE CLOSE DUPLICATES. SEE THE CONSOLE LOG.')
    }

    fs.writeFileSync(
        `../../complete_lists/all_popular_technologies.json`,
        JSON.stringify(json_output_no_exact_dupes, null, 4)
    )
} catch (e) {
    console.log('Error:', e.stack)
}
