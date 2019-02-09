# Programming technologies

## Objective: Lists of all technologies used in programming

Some applications may find it useful to offer a list of technologies like programming languages, frameworks, or platforms.

They may want a curated, normalized list of technologies users can pick from so they can be linked. They don't want one developer saying AngularJS and another saying Angular.

We want to keep XML files of these lists in this repo for anyone to use and contribute a pull request to.

## Key results

1. From sources on the web, create XML files of all "technologies." These go into the `scraped_pages` folder
2. Each XML file has no duplicated strings within it.

## Requirements for submitting a pull request

Follow our guidelines for well-formed XML.

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

## Guidelines for well-formed XML

``` xml
<?xml version = "1.0" encoding = "UTF-8"?>
<technologies url="https://en.wikipedia.org/wiki/Comparison_of_programming_languages#General_comparison">
  <technology>Bootstrap</technology>
  <technology>C++</technology>
  <technology>JavaScript</technology>
  <technology>jQuery</technology>
  <technology>Raspberry Pi</technology>
  <technology>React</technology>
  <technology>Unreal Engine</technology>
</technologies>
```

### XML declaration

Every .xml file must begin with this declaration:

``` xml
<?xml version = "1.0" encoding = "UTF-8"?>
```

This declares the version ([1.0](https://stackoverflow.com/questions/6883084/what-xml-version-to-use)) and encoding ([UTF-8](https://en.wikipedia.org/wiki/UTF-8)).

### Root element

Following the declaration, all elements must be nested under a single root element. Add the `url` attribute and the url of the page you scraped the data from:

```xml
<technologies url="https://en.wikipedia.org/wiki/Comparison_of_programming_languages#General_comparison">
  ...
</technologies>
```

### Nested elements

Within the root element, each technology is listed, wrapped in a nested element:

```xml
  <technology>Unreal Engine<technology>
```

### Escaped characters

Some characters are reserved by XML and must be replaced with character entities.

| Reserved character | Replace with | Description    |
| ------------------ | ------------ | -------------- |
| <                  | \&lt;        | less than      |
| >                  | \&gt;        | greater than   |
| &                  | \&amp;       | ampersand      |
| '                  | \&apos;      | apostrophe     |
| "                  | \&quot;      | quotation mark |


### More on XML

If you want to dive deeper into understanding XML, see the following links:

[XML Syntax - An example XML document](https://www.xmlfiles.com/xml/xml-syntax/)

[XML - Syntax](https://www.tutorialspoint.com/xml/xml_syntax.htm)

[A Really, Really, Really Good Introduction to XML](https://www.sitepoint.com/really-good-introduction-xml/)
