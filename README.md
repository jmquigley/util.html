# util.html

> HTML helper functions

[![build](https://circleci.com/gh/jmquigley/util.html/tree/master.svg?style=shield)](https://circleci.com/gh/jmquigley/util.html/tree/master)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.html.svg)](https://www.npmjs.com/package/util.html)
[![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.html/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.html?branch=master)


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

#### functions

- [newlineToBreak](docs/index.md#newlineToBreak) - takes a string with newline characters and replaces them with `<br />`
- [parseHTML](docs/index.md#parseHTML) - takes an HTML string and parses it into a [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) object where the nodes can be traversed.  It uses [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).
- [translateHTML](docs/index.md#translateHTML) - converts special HTML characters to their single character equivalents (such as `&quote;` to `"`).
- [trimHTML](docs/index.md#trimHTML) - special trim function to remove spaces from the front/end of an HTML string.
