# OptiDOM

**OptiDOM** is a lightweight JavaScript DOM manipulation library that provides an optimized API for creating, managing, and updating HTML elements efficiently. It aims to provide a simple and intuitive way to work with DOM elements.

## Features
- Simple API for creating and manipulating elements
- Supports dynamic styling and event handling
- Easy to use and integrate into existing projects
- Lightweight and performance-focused
- AND ***Intergrated into the Base JavaScript API***

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

After installing, just add this line of code to the top of every file that uses OptiDOM

```js
import 'optidom';
```
Then you can use optidom in that file!

Here’s a basic example of how to use OptiDOM's features:

> Bind shortcut
```js
document.bindShortcut('ctrl+f', (event) => {
  console.log('Ctrl + F was pressed');
});
```

> Element Methods
```js
const div = document.createElement('div');

div.css({ color: 'red', fontSize: '16px' });
div.text('Hello!');
div.html("<p>Paragraph</p>");
div.getParent().text("Im a parent!");
div.getAncestor(2)?.text("Im an ancestor!");

// WARNING: Unstable
div.change("a").href = "https://example.com";

```

> NodeList Listener
```js
const buttons = document.querySelectorAll('button');

buttons.addEventListener('click', () => {
  alert('Button clicked');
});
```

> Once Listener
```js
const element = document.getElementById('myButton');

element.addOnceListener('click', () => {
  alert('This will only trigger once!');
});
```

> Date constructor for ms
```js
const timestamp = Date.at(2025, 3, 11, 14, 30, 0, 0);
console.log(new Date(timestamp));
```
> HTMLCreator
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

> Time class
```js
const now = new Time();

// Returns milliseconds since 00:00:00 (midnight)
now.getMilliseconds();
```

> Document CSS
```js
document.css("body", {
  bakcgroundColor: "red",
  padding: 0;
})
```

> document.querySelector shorthand
```js
document.$("li.list#second")
```

And typed versions of basic js functions:
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