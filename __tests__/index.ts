import {JSDOM} from "jsdom";
import * as path from "path";
import assert from "power-assert";
import puppeteer from "puppeteer";
import {sp} from "util.constants";
import {cleanup, Fixture} from "util.fixture";
import {
	FontInfo,
	getFontInfo,
	getTextWidth,
	newlineToBreak,
	translateHTML,
	trimHTML,
	wait
} from "../index";

const debug = require("debug")("util.html.test");

let browser: any = null;
let page: any = null;
let dom: any = null;

afterAll(async (done) => {
	await browser.close();
	page = browser = null;

	cleanup({done, message: path.basename(__filename)});
});

beforeAll(async () => {
	browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"]
	});

	assert(browser);

	page = await browser.newPage();
	await page.goto("http://localhost:4000");
	await wait(3);
});

beforeEach(() => {
	const fixture = new Fixture("testpage");
	assert(fixture);

	const html = fixture.read("index.html");
	assert(html);

	dom = new JSDOM(html);
	assert(dom);
});

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

test("Test the getTextWidth function", async () => {
	let width = getTextWidth("test string");
	assert(width);
	assert(width > 0);

	width = getTextWidth("test string", "12px arial");
	assert(width);
	assert(width > 0);

	let html = await page.$eval("#w1", (e) => e.innerHTML);
	assert(html);
	assert(Number(html) > 0);

	html = await page.$eval("#w2", (e) => e.innerHTML);
	assert(html);
	assert(Number(html) > 0);
});

test("Test using the getFontInfo function", () => {
	const info: FontInfo = getFontInfo(dom.window);

	assert(info);
	assert(info.family instanceof Array);
	assert(info.family[0] === "Arial");
	assert(info.size === 16);
	assert(info.weight === "400");
});

test("Test getFontInfo with an empty doc to get defaults", () => {
	const info = getFontInfo(null);

	assert(info.family instanceof Array);
	assert(info.family[0] === "Arial");
	assert(info.size === 12);
	assert(info.weight === "400");
});
