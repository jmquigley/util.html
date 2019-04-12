## Functions

<dl>
<dt><a href="#newlineToBreak">newlineToBreak(str)</a> ⇒</dt>
<dd><p>Takes a string that may contain newline characters and converts the
newlines to <br />.</p>
</dd>
<dt><a href="#parseHTML">parseHTML(html)</a> ⇒</dt>
<dd><p>Takes a string of HTML and uses the DOMParser class to parse it into
HTML nodes.</p>
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
</dl>

<a name="newlineToBreak"></a>

## newlineToBreak(str) ⇒
Takes a string that may contain newline characters and converts the
newlines to <br />.

**Kind**: global function  
**Returns**: a new string with newlines replaced with <br />  
**Params**

- str <code>string</code> - the string to search for newlines to replace

<a name="parseHTML"></a>

## parseHTML(html) ⇒
Takes a string of HTML and uses the DOMParser class to parse it into
HTML nodes.

**Kind**: global function  
**Returns**: an HTML Document instance  
**Params**

- html <code>string</code> - text string with HTML tags

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

