/*!-
 * TextNode Translator for the jQuery Translate plugin 
 * Version: ${version}
 * http://code.google.com/p/jquery-translate/
 */

;(function($){


function getTextNodes( root, _filter ){

	var nodes = [],
		skip = {SCRIPT:1, NOSCRIPT:1, STYLE:1, IFRAME:1},
		notType = typeof _filter,
		filter = notType === "string" ? function(node){ return !$(node).is(_filter); } :
				 notType === "function" ? _filter :  //e.g. function(node){ return node.nodeName != 'A'; }
				 null;
	
	function recurse(_, root){
		var i = 0, children = root.childNodes, l = children.length, node;
		for(; i < l; i++){
			node = children[i];
			
			if(node.nodeType == 3 && /\S/.test(node.nodeValue))
				nodes.push(node);
			else if( node.nodeType == 1 &&
					!skip[ node.nodeName.toUpperCase() ] && 
					(!filter || filter(node)))
				recurse(null, node);
		}
	}
	
	$.each((root.length && !root.nodeName) ? root : [root], recurse);

	return nodes;
}

function toggleDir(e, dir){
	var align = e.css("text-align");
	e.css("direction", dir);
	if(align === "right") e.css("text-align", "left");
	if(align === "left") e.css("text-align", "right");
}

function setLangAttr(e, to, o){	
	if(!o || o.setLangAttr)
		$(e).attr((!o || o.setLangAttr === true) ? "lang" : o.setLangAttr, to);
}
	
function replace(parent, node, text, to, o){
	if(!o.replace) return;
	var isRtl = $.translate.isRtl,
		lang = $.data(parent, "lang");
	
	if( isRtl[ to ] !== isRtl[ lang || o && o.from ] ){
		var $parent = $(parent);
		if( isRtl[ to ] )
			toggleDir($parent, "rtl");
		else if( $parent.css("direction") === "rtl" )
			toggleDir($parent, "ltr");
	}
	
	$.data(parent, "lang", to);
	
	if(text != node.nodeValue){
		var newTextNode = document.createTextNode(text);
		parent.replaceChild(newTextNode, node);
		return newTextNode;
	}
	
	return node;
}

function setData(parent, o, src, trnsl){
	if(o.data){
		var TR = "translation";
		if(!$.data(parent, TR))
			$.data(parent, TR, {});
		
		if(!$.data(parent, TR)[o.from])
			$.data(parent, TR)[o.from] = [];
		[].push.call($.data(parent, TR)[o.from], src);	
		
		if(!$.data(parent, TR)[o.to])
			$.data(parent, TR)[o.to] = [];
		[].push.call($.data(parent, TR)[o.to], trnsl);	
	}
}

function getData(parent, lang, that){
	that._childIndex = that._prevParent === parent ? that._childIndex + 1 : 0;
	var tr = $.data(parent, "translation");
	that._prevParent = parent;
	return tr && tr[lang] && tr[lang][that._childIndex];
	
}

function _each(i, textNode, t, s, from, to, o){
	t = t.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'");
	
	var parent = textNode.parentNode;
	setData(parent, o, s, t);
	var newTextNode = replace(parent, textNode, t, to, o);
	setLangAttr(parent, o.to, o);
	
	return newTextNode;
}

$.translateTextNodes = function(root){ 
	var args = [].slice.call(arguments,0);
	args.shift();
	
$.translate(function(){
	var o = $.translate._getOpt(args, $.translateTextNodes.defaults),
		each = o.each,
		nodes = getTextNodes(root, o.not),
		contents = $.map(nodes, function(n){ return n.nodeValue; }),
		from = $.translate.toLanguageCode(o.from),
		obj = {};
	
	o.nodes = nodes;
	o.textNodes = true;
	

	if(o.fromOriginal)
		$.each(nodes, function(i, textNode){
			var data = getData(textNode.parentNode, from, obj);
			if( !data ) return true;
			contents[i] = data;
		});
	
	function unshiftArgs(method){
		return function(){
			[].unshift.call(arguments, this.elements);
			method.apply(this, arguments);
		};
	}
	
	o.start = unshiftArgs(o.start);
	o.onTimeout = unshiftArgs(o.onTimeout);
	o.complete = unshiftArgs(o.complete);
	
	o.each = function(i){
		var args = arguments;
		if(arguments.length !== 7) //if isn't called from _toggle
			[].splice.call(args, 1, 0, this.elements[i]);		
		this.elements[i] = args[1] = _each.apply(this, args);
		
		each.apply(this, args);
	};
	
	$.translate(contents, o);
	
});
};

$.translate.fn._toggleTextNodes = function(){
	var o = this.options, to = o.to, stop;
	
	$.each(this.elements, $.translate._bind(function(i, textNode){
		this.i = i;
		var parent = textNode.parentNode, 
		    tr = getData(parent, to, this);
		
		if(!tr) return !(stop = true);
		
		this.translation.push(tr);
		
		o.each.call(this, i, textNode, tr, this.source[i], this.from, to, o);
		//'from' will be undefined if it wasn't set
	}, this));
	
	!stop ? this._complete() : this._process();
	//o.complete.call(this, this.elements, this.translation, this.source, this.from, this.to, o);
};

$.fn.translateTextNodes = function(a, b, c){
	[].unshift.call(arguments, this);
	$.translateTextNodes.apply(null, arguments);
	return this;
};

$.translateTextNodes.defaults = $.fn.translateTextNodes.defaults = $.extend({}, $.translate._defaults);

})(jQuery);
