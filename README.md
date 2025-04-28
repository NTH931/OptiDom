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

And more!

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

Heres a list of all of the OptiDOM features:

| **Class**                          | Name                           | Status         | Description/Notes                     |
| ------------------------------ | ------------------------------ | -------------- | ------------------------------------- |
| `global`                       | `f`                            | ✅             | Shortcut to immediately invoke an IIFE |
| `global`                       | `createEventListener`          | ✅             | Shortcut for event binding             |
| `global`                       | `LocalStorage`                 | ✅             | LocalStorage wrapper                   |
| `global`                       | `SessionStorage`               | ✅             | SessionStorage wrapper                 |
| `global`                       | `Cookie`                       | ✅             | Cookie wrapper                         |
| `global`                       | `Time`                         | ✅             | Time utility class                     |
| `global`                       | `Sequence`                     | ❗ Unchecked    | Sequence utility (unchecked)           |
| `global`                       | `optidom`                      | ✅             | Main `OptiDOM` instance                |
| `global`                       | `isEmpty`                      | ✅             | Utility to check if an object is empty |
| `global`                       | `type`                         | ✅             | Utility to detect variable type        |
| `global`                       | `UnknownError`                 | ✅             | Custom `UnknownError` class            |
| `global`                       | `NotImplementedError`          | ✅             | Custom `NotImplementedError` class     |
| `Document`                    | `ready`                        | ✅             | Runs when DOM is fully loaded         |
| `Document`                    | `leaving`                      | ❗ Not Working | Runs when page is unloading           |
| `Document`                    | `elementCreator`               | ✅             | Simplified element creation           |
| `Document`                    | `bindShortcut`                 | ✅             | Bind key shortcuts                    |
| `Document`                    | `css`                          | ✅             | Document-wide CSS control             |
| `Document`                    | `$`, `$$`                      | ✅             | Query selector shortcuts              |
| `Date`                        | `at`, `fromTime`               | ✅             | Parse or create date/time objects     |
| `NodeList` / `HTMLCollection` | `addEventListener`             | ✅             | Bulk event listeners                  |
|                               | `addClass`, `removeClass`, `toggleClass` | ✅   | Bulk class manipulation              |
|                               | `single`                       | ✅             | Get first element or `null`           |
| `EventTarget`                 | `addBoundListener`, `addEventListeners` | ✅    | Add multiple/bound event listeners   |
| `Element`                     | `hasText`, `text`              | ✅             | Text utilities                       |
|                               | `addClass`, `removeClass`, `toggleClass`, `hasClass` | ✅ | Class manipulation                 |
| `HTMLElement`                 | `css`, `elementCreator`, `tag`, `html`, `show`, `hide` | ✅ | Full DOM utility |suite               |
|                               | `toggle`                       | ❗ Not Working | Show/hide toggle                     |
|                               | `fadeIn`, `fadeOut`, `fadeToggle`, `slideIn`, `slideOut`, `slideToggle`, `animate` | ❗ Unchecked | Animations (future support?)         |
| `HTMLFormElement`             | `serialize`                    | ❗ Unchecked   | Serialize form fields                |
| `Node`                        | `getParent`, `getAncestor`, `getChildren`, `getSiblings`, `querySelectAncestor`, `find`, `findAll` | ✅ | DOM traversal utilities             |
| `Math`                        | `random`                       | ✅             | Random number utility (customized)   |
| `Object`                      | `clone`, `forEach`             | ✅             | Clone objects, forEach on objects     |
| `Number`                      | `repeat`                       | ✅             | Repeat operations for numbers         |
| `JSON`                        | `parseFile`                    | ✅             | Parse JSON from a file (async/await)  |
| `Array`                       | `unique`, `chunk`              | ✅             | Array de-duplicate and chunking       |
| `String`                      | `remove`, `removeAll`          | ✅             | Remove substrings                     |


### 📏 Window/HTMLElement Property Extensions

| Object                        | Getter / Setter                | Status         | Description/Notes                    |
| ----------------------------- | ------------------------------ | -------------- | ------------------------------------ |
| `Window`                      | `width`, `height`              | ✅             | Window size getters                  |
| `HTMLElement`                 | `visible`                      | ✅             | Visibility check for elements        |


## Contributing

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/your-feature`)

3. Commit your changes (`git commit -am 'Add new feature'`)

4. Push to the branch (`git push origin feature/your-feature`)

5. Create a new Pull Request