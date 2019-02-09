# Programming technologies

## Goal: Lists of all technologies used in programming

Some applications may find it useful to offer a list of technologies like programming languages, frameworks, or platforms.

They may want a curated, normalized list of technologies users can pick from so they can be linked. They don't want one developer saying AngularJS and another saying Angular.

We want to keep .xml files of these lists in this repo for anyone to use and contribute a pull request to.

## Requirements for submitting a pull request

Follow our guidelines for well-formed XML.

Every technology must have its own Wikipedia page.

## Guidelines for well-formed XML

``` xml
<?xml version = "1.0" encoding = "UTF-8"?>
<technologies>
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

Following the declaration, all elements must be nested under a single root element:

```xml
<technologies>
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

| Reserved character | Replace with | Description |
| --- | --- | --- |
| < | \&lt; | less than |
| > | &gt; | greater than |
| & | &amp; | ampersand |
| ' | &apos; | apostrophe |
| " | &quot;| quotation mark |


### More on XML

If you want to dive deeper into understanding XML, see the following links:

[XML Syntax - An example XML document](https://www.xmlfiles.com/xml/xml-syntax/)

[XML - Syntax](https://www.tutorialspoint.com/xml/xml_syntax.htm)

[A Really, Really, Really Good Introduction to XML](https://www.sitepoint.com/really-good-introduction-xml/)
