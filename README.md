[![Build Status](https://www.travis-ci.com/no-chris/chord-symbol-musicxml.svg?branch=main)](https://www.travis-ci.com/no-chris/chord-symbol-musicxml)
[![Coverage Status](https://coveralls.io/repos/github/no-chris/chord-symbol-musicxml/badge.svg?branch=main)](https://coveralls.io/github/no-chris/chord-symbol-musicxml?branch=main)
[![codebeat badge](https://codebeat.co/badges/a51aca5d-ec03-4eaf-a04d-bff666a0cf4e)](https://codebeat.co/projects/github-com-no-chris-chord-symbol-musicxml-main)

`chord-symbol-musicxml` is a pluggable rendering filter for `chord-symbol` that generates chords in the MusicXml notation. It outputs a plain Javascript object that can easily be turned into an XML `harmony` entity using a library such as [jstoxml](https://github.com/davidcalhoun/jstoxml).

# Installation

```shell
npm install --save chord-symbol-musicxml
```

# Usage

```javascript
import { chordParserFactory, chordRendererFactory } from 'chord-symbol';
import { musicXmlRenderer } from 'chord-symbol-musicxml';

const parseChord = chordParserFactory();
const renderChord = chordRendererFactory({
	printer: 'raw',
	customFilters: [musicXmlRenderer],
});

const parsed = parseChord('C7sus(b5)/Gb');
const rendered = renderChord(parsed);

console.log(rendered.musicxml);
```

`rendered.musicxml` contains the following object structure:

```json
{
	"_name": "harmony",
	"_content": [
		{
			"_name": "root",
			"_content": [{ "_name": "root-step", "_content": "C" }]
		},
		{
			"_name": "kind",
			"_attrs": { "text": "7sus" },
			"_content": "dominant"
		},
		{
			"_name": "bass",
			"_content": [
				{ "_name": "bass-step", "_content": "G" },
				{ "_name": "bass-alter", "_content": "-1" }
			]
		},
		{
			"_name": "degree",
			"_attrs": { "print-object": "no" },
			"_content": [
				{ "_name": "degree-value", "_content": "3" },
				{ "_name": "degree-type", "_content": "subtract" }
			]
		},
		{
			"_name": "degree",
			"_attrs": { "print-object": "no" },
			"_content": [
				{ "_name": "degree-value", "_content": "4" },
				{ "_name": "degree-type", "_content": "add" }
			]
		},
		{
			"_name": "degree",
			"_content": [
				{ "_name": "degree-value", "_content": "5" },
				{ "_name": "degree-alter", "_content": "-1" },
				{ "_name": "degree-type", "_content": "alter" }
			]
		}
	]
}
```

If you want some XML string, you can use `jstoxml` to convert the Javascript object into an XML entity

```javascript
import { toXML } from 'jstoxml';

const xml = toXML(rendered.musicxml);

console.log(xml);
```

This will output the following String:

```xml
<harmony>
	<root>
		<root-step>C</root-step>
	</root>
	<kind text="7sus">dominant</kind>
	<bass>
		<bass-step>G</bass-step>
		<bass-alter>-1</bass-alter>
	</bass>
	<degree print-object="no">
		<degree-value>3</degree-value>
		<degree-type>subtract</degree-type>
	</degree>
	<degree print-object="no">
		<degree-value>4</degree-value>
		<degree-type>add</degree-type>
	</degree>
	<degree>
		<degree-value>5</degree-value>
		<degree-alter>-1</degree-alter>
		<degree-type>alter</degree-type>
	</degree>
</harmony>
```
