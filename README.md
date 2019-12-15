# util.html

> HTML helper functions

[![build](https://github.com/jmquigley/util.html/workflows/build/badge.svg)](https://github.com/jmquigley/util.html/actions)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.html.svg)](https://www.npmjs.com/package/util.html)


## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency:
```
$ yarn add util.html
```

To build the app and run all tests:
```
$ yarn run all
```


## Overview
This module contains custom HTML manipulation functions.


## API

#### Attributes

- `events` - an array of possible events that can be used in javascript for event listeners.  The list was taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/Events).

#### functions

- [getFontWidth](docs/index.md#getFontInfo) - Reads the current font style information from the body of the current document.
- [getTextWidth](docs/index.md#getTextWidth) - Takes an input string and font settings and computes the pixel width of the string.
- [newlineToBreak](docs/index.md#newlineToBreak) - takes a string with newline characters and replaces them with `<br />`
- [translateHTML](docs/index.md#translateHTML) - converts special HTML characters to their single character equivalents (such as `&quote;` to `"`).
- [trimHTML](docs/index.md#trimHTML) - special trim function to remove spaces from the front/end of an HTML string.
