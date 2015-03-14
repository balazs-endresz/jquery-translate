This method method returns the deepest elements containing textnodes.
If an element contains textnodes and other elements too then its .html() will be returned.

## Options ##
Override defaults with `$.fn.nodesContainingText.defaults`

  * not: ''
    * selector - elements to leave out (script, noscript, style, object and iframe elements will be omitted either this is set or not)
    * doesn't work for elements having textnode siblings, as their parent node will be returned
  * async: false
    * this prevents the browser from freezing on larger sites by executing each filtering iteration with a delay
    * you can set the length of the delay in ms, setting it true means 2 ms
  * altAndVal: true
    * get the `alt` and `:button,:text,:reset`'s `value` attribute too
    * (useful when translating text/html with the `subject:true` option, because these don't have any textnodes, so they can be processed and translated along with other nodes)


  * each: function(){}
    * arguments: i, DOMelement, containing text
  * complete: function(){}
    * arguments: array`<DOMelement>`, array`<containing text>`