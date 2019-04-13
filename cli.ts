#!/usr/bin/env node

//
// This cli is only used to test the parseHTML function outside of a window/browser
// instance.  It is not linked as part of the app.
//
// use "./cli.js" after the build to test parsing a test file from the CLI.
//

const {parseHTML} = require("./index.umd.min");
console.log(parseHTML("./__test__/fixtures/simple/test.html"));
