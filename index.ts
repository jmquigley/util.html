import {JSDOM} from "jsdom";
import {sp} from "util.constants";
import {isBrowser} from "util.toolbox";

const debug = require("debug")("util.html");

const chevrons = {
	quot: '"',
	nbsp: " ",
	amp: "&",
	lt: "<",
	gt: ">"
};

const s = Object.keys(chevrons).join("|");
debug("Using chevrons: %s", s);

const reHTML: RegExp = RegExp(`&(${s});`, "gi");
const reSPC: RegExp = RegExp(`${sp}`, "g");

let domParser: DOMParser;
if (isBrowser() && "DOMParser" in window) {
	domParser = new (window as any).DOMParser();
} else {
	const dom = new JSDOM();
	domParser = new dom.window.DOMParser();
}

/**
 * Takes a string that may contain newline characters and converts the
 * newlines to <br />.
 * @param str {string} - the string to search for newlines to replace
 * @return a new string with newlines replaced with <br />
 */
export function newlineToBreak(str: string): string {
	return str.replace(/\r\n|\n|\r/g, "<br />");
}

/**
 * Takes a string of HTML and uses the DOMParser class to parse it into
 * HTML nodes.
 * @param html {string} - text string with HTML tags
 * @return an HTML Document instance
 */
export function parseHTML(html: string): Document {
	const doc: Document = domParser.parseFromString(html, "text/html");
	debug("parseHTML: %O", doc);
	return doc;
}

/**
 * Takes an input string and replaces special HTML tokens with their string
 * eqivalents.  e.g. &nbsp; is converted to a space
 * @param text {string} the text string to translate
 * @return {string} a new string with their replacements
 */
export function translateHTML(text: string): string {
	return text.replace(reHTML, (match: any, ele: string) => {
		match = match;
		return chevrons[ele];
	});
}

/**
 * This is a special trim function that will remove spaces from the front/end
 * of a string.  It will also replace all u+200b and &nbsp; characters to ' '
 * before the trim (so it can remove all types of spaces)
 * @param text {string} the text string to trim
 * @return {string} a new string with spaces trimmed.
 */
export function trimHTML(text: string): string {
	return translateHTML(text)
		.replace(reSPC, " ")
		.trim();
}
