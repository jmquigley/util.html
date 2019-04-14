import assert from "power-assert";
import {sp} from "util.constants";
import {newlineToBreak, translateHTML, trimHTML} from "./index";

const debug = require("debug")("util.html::test");

test("Test translation of HTML string entities", () => {
	assert(translateHTML("abc &quot; def") === 'abc " def');
	assert(translateHTML("abc &nbsp; def") === "abc   def");
	assert(translateHTML("abc &amp; def") === "abc & def");
	assert(translateHTML("abc &lt; def") === "abc < def");
	assert(translateHTML("abc &gt; def") === "abc > def");
});

test("Test special HTML trim function", () => {
	assert(trimHTML(`&nbsp; abc ${sp}`) === "abc");
	assert(trimHTML(`abc &nbsp; def`) === "abc   def");
	assert(trimHTML(`${sp}abc${sp}def${sp}`) === "abc def");
	assert(trimHTML(`&nbsp;abc&nbsp;def&nbsp;`) === "abc def");
});

test("Test changing newlines to the html break tag", () => {
	assert(newlineToBreak(`\ntest\n`) === "<br />test<br />");
	assert(newlineToBreak(`\r\ntest\r\n`) === "<br />test<br />");
	assert(newlineToBreak(`\rtest\r`) === "<br />test<br />");
	assert(newlineToBreak(`\nte\nst\r`) === "<br />te<br />st<br />");
});

test("Test using multiple break strings", () => {
	assert(newlineToBreak("test\n", 2) === "test<br /><br />");
});
