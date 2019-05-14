## Functions

<dl>
<dt><a href="#newlineToBreak">newlineToBreak(str, count)</a> ⇒</dt>
<dd><p>Takes a string that may contain newline characters and converts the
newlines to <br />.</p>
</dd>
<dt><a href="#translateHTML">translateHTML(text)</a> ⇒ <code>string</code></dt>
<dd><p>Takes an input string and replaces special HTML tokens with their string
eqivalents.  e.g. &nbsp; is converted to a space</p>
</dd>
<dt><a href="#trimHTML">trimHTML(text)</a> ⇒ <code>string</code></dt>
<dd><p>This is a special trim function that will remove spaces from the front/end
of a string.  It will also replace all u+200b and &nbsp; characters to &#39; &#39;
before the trim (so it can remove all types of spaces)</p>
</dd>
<dt><a href="#getTextWidth">getTextWidth(text, font)</a> ⇒</dt>
<dd><p>Takes an input text string and uses the canvas element to determine the
width of the string in pixels.  This is a way to dynamically find it
based on the font and the size.  The font uses the following format
as a string:</p>
<pre><code>|{weight}| {point size in px} {font family}
</code></pre><p>e.g.
    &quot;bold 12px aria&quot;</p>
</dd>
</dl>

<a name="newlineToBreak"></a>

## newlineToBreak(str, count) ⇒
Takes a string that may contain newline characters and converts the
newlines to <br />.

**Kind**: global function  
**Returns**: a new string with newlines replaced with <br />  
**Params**

- str <code>string</code> - the string to search for newlines to replace
- count <code>number</code> <code> = 1</code> - the number of times each break string
should be repeated.  The default is to only have one string.

<a name="translateHTML"></a>

## translateHTML(text) ⇒ <code>string</code>
Takes an input string and replaces special HTML tokens with their string
eqivalents.  e.g. &nbsp; is converted to a space

**Kind**: global function  
**Returns**: <code>string</code> - a new string with their replacements  
**Params**

- text <code>string</code> - the text string to translate

<a name="trimHTML"></a>

## trimHTML(text) ⇒ <code>string</code>
This is a special trim function that will remove spaces from the front/end
of a string.  It will also replace all u+200b and &nbsp; characters to ' '
before the trim (so it can remove all types of spaces)

**Kind**: global function  
**Returns**: <code>string</code> - a new string with spaces trimmed.  
**Params**

- text <code>string</code> - the text string to trim

<a name="getTextWidth"></a>

## getTextWidth(text, font) ⇒
Takes an input text string and uses the canvas element to determine the
width of the string in pixels.  This is a way to dynamically find it
based on the font and the size.  The font uses the following format
as a string:

    |{weight}| {point size in px} {font family}

e.g.
    "bold 12px aria"

**Kind**: global function  
**Returns**: a number representing the width in pixels.  
**Params**

- text <code>string</code> - the input string to measure its length
- font <code>string</code> <code> = null</code> - the font settings for the input string. This
is needed to properly compute the number of pixels becuase it will
change based on the font used.

