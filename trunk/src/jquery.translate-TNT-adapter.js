/*!-
 * TextnodeTranslator adapter for the jQuery Translate plugin 
 * Version: ${version}
 * http://code.google.com/p/jquery-translate/
 */

/*globals Translator*/ 
;(function($){

//TODO: add data support
$.translateTextNodes = function(root){
	var args = [].slice.call(arguments,0);
	[].shift.call(args);

	var o = $.translate._getOpt(args, $.translateTextNodes.defaults),
		replaceFunctions = [],
		contents = [],
		each = o.each,
		notType = typeof o.not, //not: function(node){ return node.nodeName != 'A'; }
		filter = notType === "string" ? function(e){ return !$(e).is(o.not); } :
				 notType === "function" ? o.not : 
				 null;

	$.each(root[0] ? root : [root], function(i, e){
		var tr = new Translator(function(str, fn){
			contents.push(str);
			replaceFunctions.push( o.replace ? fn : function(){} );
		}, filter);
		
		tr.sync = false;
		tr.traverse(e);
	});
	
	return $.translate(contents, $.extend(o, {
		each: function(i, translation){
			replaceFunctions[i]( translation );
			each.apply(this, arguments);
		}
	}));
	
};

//TODO: remove slice
$.fn.translateTextNodes = function(a, b, c){
	[].unshift.call(arguments, this);
	$.translateTextNodes.apply(null, [].slice.call(arguments,0));
	return this;
};

var defaults = $.extend({}, $.translate._defaults);

$.translateTextNodes.defaults = $.extend({}, defaults);

$.fn.translateTextNodes.defaults = $.extend({}, defaults);


})(jQuery);
