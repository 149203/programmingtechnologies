const fs = require('fs')
const _ = require('lodash')

try {
    let original_array = JSON.parse(
        fs.readFileSync(
            `../../complete_lists/programming_technologies.json`,
            'utf8'
        )
    )

    const array_with_ids = _.map(original_array, (technology, i) => {
        technology.id = i + 1
        return technology
    })

    console.log(array_with_ids)

    fs.writeFileSync(
        `../../complete_lists/programming_technologies_with_ids.json`,
        JSON.stringify(array_with_ids, null, 4)
    )
} catch (e) {
    console.log('Error:', e.stack)
}
