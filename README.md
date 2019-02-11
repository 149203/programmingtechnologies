# Programming technologies

## Objective: Lists of all technologies used in programming

Some applications may find it useful to offer a list of technologies like programming languages, frameworks, or platforms.

They may want a curated, normalized list of technologies users can pick from so they can be linked. They don't want one developer saying Vue and another saying Vue.js.

We want to keep JSON files of these lists in this repo for anyone to use and contribute a pull request to.

## Key results

1. From sources on the web, create JSON files of all "technologies." These go into the `scraped_pages` folder
2. Each JSON file has no duplicated strings within it.
3. Follow previously checked-in conventions.
4. Use [JSONLint](https://jsonlint.com/) to ensure your file is valid JSON.

## Formatting

Each technology must have its own Wikipedia page to be counted as a "technology."

Remove text Wikipedia (or any other page you scrape) may have added for clarification. This includes parentheticals, any unlinked explanatory text, text following a hypen, etc.

For example,

```
React (JavaScript framework)
```

becomes simply

```
React
```

And

```
XML - a markup language
```

should be simply

```
XML
```

## Links

[Fun facts about JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#Other_notes)

[JSONLint](https://jsonlint.com/)
