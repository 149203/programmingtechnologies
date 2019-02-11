const fs = require('fs')

const page_title = 'Timeline of programming languages'
const page_url =
    'https://en.wikipedia.org/wiki/Timeline_of_programming_languages'
const js_object = { page_title, page_url, technologies: [] }
const col_number = 2

try {
    let text = fs.readFileSync('pages/test.txt', 'utf8')
    text.match(/(?<=(\|\-)).+?(?=(\|\-))/gs).forEach(row => {
        // fs.appendFileSync('results/test_results.txt', row)
        row.match(/(?!(\|))(?!(\s)).+/g).forEach((col, i) => {
            if (i + 1 === col_number) {
                console.log(col)
                // if it's a working link, output to file
                if (/(?<=\[\[).*?\|.*?(?=\]\])/.test(col)) {
                    js_object.technologies.push(format_name(col))
                    //fs.appendFileSync('results/test_results.txt', '[{}]')
                }
            }
        })
        // regex for col: /(?!(\|))(?!(\s)).+/g
        // regex for the link: /(?<=\[\[).*?\|.*?(?=\]\])/
    })
    fs.writeFileSync(
        'results/test_results.json',
        JSON.stringify(js_object, null, 4)
    )
} catch (e) {
    console.log('Error:', e.stack)
}

function format_name(col) {
    const removed_beginning_brackets = col.replace(/^\[\[/, '')
    const removed_ending_syntax = removed_beginning_brackets.replace(
        /\s?(\(|\-|\||#).+/,
        ''
    )
    const replace_sharp = removed_ending_syntax.replace(/\s+sharp$/i, '#')
    return replace_sharp
}
