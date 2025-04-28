# OptiDOM

[![npm version](https://img.shields.io/npm/v/optidom)](https://www.npmjs.com/package/optidom)
![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/optidom)](https://bundlephobia.com/result?p=optidom)
[![issues](https://img.shields.io/github/issues/NTH931/optidom)](https://github.com/NTH931/optidom/issues)

*No specific imports. No wrappers. Just power where it belongs — right on your native objects.*

**OptiDOM** is a lightweight JavaScript DOM manipulation library that provides an optimized API for creating, managing, and updating HTML elements efficiently. It aims to provide a simple and intuitive way to work with DOM elements.

## Features
- Simple API for creating and manipulating elements
- Supports dynamic styling and event handling
- Easy to use and integrate into existing projects
- Lightweight and performance-focused

### Integration like you've never seen!
OptiDOM isn’t just another library — it's **seamlessly integrated into the base JavaScript API.** This means you can use its features directly on native DOM objects without importing or wrapping.
  
- `Document`

  - `document.bindShortcut('ctrl+s', callback)`

  - `document.css('selector', styleObject)`

  - `document.$('selector')`

  - `document.elementcreator('tag')`

- `HTMLElement`

  - `.css(styles)`

  - `.text(content)`

  - `.html(htmlString)`

  - `.getParent()`

  - `.getAncestor(level)`

  - `.addBoundListener(event, callback)`

- `NodeList`

  - `.addEventListener(event, callback)` — *like you always wished it worked.*

- `Date`

  - `Date.at(...)` — *for millisecond timestamps*

Window, JSON, DOMTokenList, and more are also extended where useful.

## Installation

You can install OptiDOM via npm:

```bash
npm install optidom
```
Or, if you are using Yarn:

```bash
yarn add optidom
```
## Usage

Just import OptiDOM once per file:

```js
import 'optidom';
```
Then you're good to go! OptiDOM will then automatically attack the functions to the javascript objects

Here’s a basic example of how to use OptiDOM's features:

### Bind Shortcuts
```js
document.bindShortcut('ctrl+f', (event) => {
  console.log('Ctrl + F was pressed');
});
```

### Element Methods
```js
const div = document.createElement('div');

div.css({ color: 'red', fontSize: '16px' });
div.text('Hello!');
div.html("<p>Paragraph</p>");
div.getParent().text("Im a parent!");
div.getAncestor(2)?.text("Im an ancestor!");

// WARNING: Unstable, changes the HTML tag
div.tag("a").href = "https://example.com";

```

### NodeList Listener
```js
const buttons = document.querySelectorAll('button');

buttons.addEventListener('click', () => {
  alert('Button clicked');
});
```

### Once Listener
```js
const element = document.getElementById('myButton');

element.addBoundListener('click', () => {
  alert('This will only trigger once!');
});
```

### Date Constructor for Milliseconds
```js
const timestamp = Date.at(2025, 3, 11, 14, 30, 0, 0);
console.log(new Date(timestamp));
```

## HTMLCreator

```js
const parent = document.getElementById("parent");

const creator = new HTMLElementCreator("div");

creator.el('div', { id: 'myDiv', class: 'container' });
creator.element.textContent = 'Hello, world!';
creator.append(document.getElementById("parent"));

// AND

const parent = document.getElementById("parent");

document.elementcreator("div")
  .el('div', { id: 'myDiv', class: 'container' })
  .append(parent)
```

## Time class
```js
// Now
const time = new Time();
// At a specific time
const timeAt = new Time(14, 30, 15, 250);
// From date
const timeDate = new Time(new Date());

time.subtractMiliseconds(6000);
timeAt.getTime();
console.log(timeDate.toString());
console.log(time.compare(timeAt)); // 1 / 0 / -1
console.log(time.isBefore(timeDate));
console.log(time.isAfter(timeAt));

const parsed = Time.fromString("23:59:59.999");
console.log(parsed.toISOString()); // "T23:59:59.999Z"

const isoParsed = Time.fromISOString("T06:30:00.000Z");
console.log(isoParsed.toString()); // "06:30:00"

```

### Document CSS
```js
document.css("body", {
  backgroundColor: "red",
  padding: 0,
})
```

### document.querySelector shorthand
```js
document.$("li.list#second")

// same as

document.querySelector("li.list#second");
```

### Typed Functions

OptiDOM also provides typed versions of basic JavaScript functions:
 - `JSON.parse`
 - `document.getElementById`
 - `document.getElementsByClassName`
 - `document.querySelector`
 - `document.querySelectorAll`


## Contributing

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/your-feature`)

3. Commit your changes (`git commit -am 'Add new feature'`)

4. Push to the branch (`git push origin feature/your-feature`)

5. Create a new Pull Request