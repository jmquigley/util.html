import {sp} from "util.constants";

const chevrons = {
	quot: '"',
	nbsp: " ",
	amp: "&",
	lt: "<",
	gt: ">"
};

const s = Object.keys(chevrons).join("|");

const reHTML: RegExp = RegExp(`&(${s});`, "gi");
const reSPC: RegExp = RegExp(`${sp}`, "g");

/**
 * Takes a string that may contain newline characters and converts the
 * newlines to <br />.
 * @param str {string} - the string to search for newlines to replace
 * @param count=1 {number} - the number of times each break string
 * should be repeated.  The default is to only have one string.
 * @return a new string with newlines replaced with <br />
 */
export function newlineToBreak(str: string, count: number = 1): string {
	const brk: string = "<br />".repeat(count);
	return str.replace(/\r\n|\n|\r/g, brk);
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
