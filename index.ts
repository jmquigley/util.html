import {unitToNumber} from "util.calc";
import {sp} from "util.constants";
import {roundUp} from "util.toolbox";
import {waitPromise} from "util.wait";

// const debug = require("debug")("util.html");

declare global {
	interface Window {
		canvas: any;
	}
}

export interface FontInfo {
	family?: string[];
	size?: number;
	weight?: string;
}

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

let canvas: any = null;

export const wait = waitPromise;

//
// Support HTML standard events based on the MDN list:
//
// https://developer.mozilla.org/en-US/docs/Web/Events
// https://devdocs.io/dom/eventtarget/addeventlistener
//

export enum EventName {
	abort = "abort",
	afterprint = "afterprint",
	animationcancel = "animationcancel",
	animationend = "animationend",
	animationiteration = "animationiteration",
	animationstart = "animationstart",
	appinstalled = "appinstalled",
	audioprocess = "audioprocess",
	audioend = "audioend",
	audiostart = "audiostart",
	beforeprint = "beforeprint",
	beforeunload = "beforeunload",
	beginEvent = "beginEvent",
	blocked = "blocked",
	blur = "blur",
	boundary = "boundary",
	canplay = "canplay",
	canplaythrough = "canplaythrough",
	change = "change",
	chargingchange = "chargingchange",
	chargingtimechange = "chargingtimechange",
	click = "click",
	close = "close",
	complete = "complete",
	compositionend = "compositionend",
	compositionstart = "compositionstart",
	compositionupdate = "compositionupdate",
	contextmenu = "contextmenu",
	copy = "copy",
	cut = "cut",
	dblclick = "dblclick",
	devicechange = "devicechange",
	devicemotion = "devicemotion",
	deviceorientation = "deviceorientation",
	dischargingtime = "dischargingtime",
	DOMActivate = "DOMActivate",
	DOMAttributeNameChanged = "DOMAttributeNameChanged",
	DOMAttrModified = "DOMAttrModified",
	DOMCharacterDataModified = "DOMCharacterDataModified",
	DOMContentLoaded = "DOMContentLoaded",
	DOMElementNameChanged = "DOMElementNameChanged",
	DOMFocusIn = "DOMFocusIn",
	DOMFocusOut = "DOMFocusOut",
	DOMNodeInserted = "DOMNodeInserted",
	DOMNodeInsertedIntoDocument = "DOMNodeInsertedIntoDocument",
	DOMNodeRemoved = "DOMNodeRemoved",
	DOMNodeRemovedFromDocument = "DOMNodeRemovedFromDocument",
	DOMSubtreeModified = "DOMSubtreeModified",
	drag = "drag",
	dragend = "dragend",
	dragenter = "dragenter",
	dragleave = "dragleave",
	dragover = "dragover",
	dragstart = "dragstart",
	drop = "drop",
	durationchange = "durationchange",
	emptied = "emptied",
	end = "end",
	ended = "ended",
	endEvent = "endEvent",
	error = "error",
	focus = "focus",
	focusin = "focusin",
	focusout = "focusout",
	fullscreenchange = "fullscreenchange",
	fullscreenerror = "fullscreenerror",
	gamepadconnected = "gamepadconnected",
	gamepaddisconnected = "gamepaddisconnected",
	gotpointercapture = "gotpointercapture",
	hashchange = "hashchange",
	lostpointercapture = "lostpointercapture",
	input = "input",
	invalid = "invalid",
	keydown = "keydown",
	keypress = "keypress",
	keyup = "keyup",
	languagechange = "languagechange",
	levelchange = "levelchange",
	load = "load",
	loadeddata = "loadeddata",
	loadedmetadata = "loadedmetadata",
	loadend = "loadend",
	loadstart = "loadstart",
	mark = "mark",
	message = "message",
	messageerror = "messageerror",
	mousedown = "mousedown",
	mouseenter = "mouseenter",
	mouseleave = "mouseleave",
	mousemove = "mousemove",
	mouseout = "mouseout",
	mouseover = "mouseover",
	mouseup = "mouseup",
	nomatch = "nomatch",
	notificationclick = "notificationclick",
	offline = "offline",
	online = "online",
	open = "open",
	orientationchange = "orientationchange",
	pagehide = "pagehide",
	pageshow = "pageshow",
	paste = "paste",
	pause = "pause",
	pointercancel = "pointercancel",
	pointerdown = "pointerdown",
	pointerenter = "pointerenter",
	pointerleave = "pointerleave",
	pointerlockchange = "pointerlockchange",
	pointerlockerror = "pointerlockerror",
	pointermove = "pointermove",
	pointerout = "pointerout",
	pointerover = "pointerover",
	pointerup = "pointerup",
	play = "play",
	playing = "playing",
	popstate = "popstate",
	progress = "progress",
	push = "push",
	pushsubscriptionchange = "pushsubscriptionchange",
	ratechange = "ratechange",
	readystatechange = "readystatechange",
	repeatEvent = "repeatEvent",
	reset = "reset",
	resize = "resize",
	resourcetimingbufferfull = "resourcetimingbufferfull",
	result = "result",
	resume = "resume",
	scroll = "scroll",
	seeked = "seeked",
	seeking = "seeking",
	select = "select",
	selectstart = "selectstart",
	selectionchange = "selectionchange",
	show = "show",
	slotchange = "slotchange",
	soundend = "soundend",
	soundstart = "soundstart",
	speechend = "speechend",
	speechstart = "speechstart",
	stalled = "stalled",
	start = "start",
	storage = "storage",
	submit = "submit",
	success = "success",
	suspend = "suspend",
	SVGAbort = "SVGAbort",
	SVGError = "SVGError",
	SVGLoad = "SVGLoad",
	SVGResize = "SVGResize",
	SVGScroll = "SVGScroll",
	SVGUnload = "SVGUnload",
	SVGZoom = "SVGZoom",
	timeout = "timeout",
	timeupdate = "timeupdate",
	touchcancel = "touchcancel",
	touchend = "touchend",
	touchmove = "touchmove",
	touchstart = "touchstart",
	transitionend = "transitionend",
	unload = "unload",
	upgradeneeded = "upgradeneeded",
	userproximity = "userproximity",
	voiceschanged = "voiceschanged",
	versionchange = "versionchange",
	visibilitychange = "visibilitychange",
	volumechange = "volumenchange",
	waiting = "waiting",
	wheel = "wheel"
}

export const events: string[] = Object.keys(EventName)
	.map((k: string) => EventName[k])
	.sort();

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

/**
 * Reads the current font style information from the body of the current document.
 * Note that this may NOT be the same as the font for an element as that can
 * be changed.  This is useful in an app where the UI is controlling the
 * main font.
 * The style info is saved in an FontInfo structure.  It contains these fields:
 *
 * - `fammily {string[]}` - the array of fonts for this family for this page.
 * - `size {number}` - the size of the font width in pixels (as a number)
 * - `wegith {string}` - the font weight per the CSS spec.
 *
 * @param rootWindow=window {Element} - the window where the body element
 * whose styles the font information will be retrieved can be found.  The
 * default is the body of the document.
 * @param defaultFamily="Arial" {string} - if the font family is not found
 * then this is the default used.
 * @param defaultSize=12 {number} - if the font size can't be found then this
 * default is used.
 * @param defaultWeight="400" {string} - if the font weight can't be found
 * then this default is used.
 * @returns a `FontInfo` object with the fields family, size, and weight.
 */
export function getFontInfo(
	rootWindow: any = window,
	defaultFamily: string = "Arial",
	defaultSize: number = 12,
	defaultWeight: string = "400"
): FontInfo {
	const info: FontInfo = {
		family: defaultFamily.split(",").map((it: string) => it.trim()),
		size: defaultSize,
		weight: defaultWeight
	};

	if (rootWindow) {
		const style = rootWindow.getComputedStyle(
			rootWindow.document.body,
			null
		);

		if (style) {
			const family = style.getPropertyValue("font-family");
			if (family) {
				info.family = family
					.replace(/[\'\"]/g, "")
					.split(",")
					.map((it: string) => it.trim());
			}

			const size = style.getPropertyValue("font-size");
			if (size) {
				info.size = unitToNumber(size);
			}

			const weight = style.getPropertyValue("font-weight");
			if (weight) {
				info.weight = weight;
			}
		}
	}

	// debug("getFontInfo -> %O", info);

	return info;
}

/**
 * Takes an input text string and uses the canvas element to determine the
 * width of the string in pixels.  This is a way to dynamically find it
 * based on the font and the size.  The font uses the following format
 * as a string:
 *
 *     |{weight}| {point size in px} {font family}
 *
 * e.g.
 *     "bold 12px aria"
 *
 * @param text {string} - the input string to measure its length
 * @param font=null {string} - the font settings for the input string. This
 * is needed to properly compute the number of pixels becuase it will
 * change based on the font used.
 * @return a number representing the width in pixels.
 */
export function getTextWidth(text: string, font: string = null): number {
	if (!canvas) {
		canvas = window.canvas || window.document.createElement("canvas");
		window.canvas = canvas;
	}

	const context = canvas.getContext("2d");

	if (font) {
		context.font = font;
	}

	const metrics = context.measureText(text);

	// 	debug(
	// 		"getTextWidth -> canvas: %O, context: %O, metrics: %O, text: %O, font: %O",
	// 		canvas,
	// 		context,
	// 		metrics,
	// 		text,
	// 		font
	// 	);

	return roundUp(metrics.width);
}
