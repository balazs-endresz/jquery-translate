/*!-
 * Simple user interface extension for the jQuery Translate plugin 
 * Version: ${version}
 * http://code.google.com/p/jquery-translate/
 */
;(function($){

var defaults = {
	tags: ["select", "option"],
	filter: $.translate.isTranslatable,
	label: $.translate.toNativeLanguage || 
		function(langCode, lang){
			return $.translate.capitalize(lang);
		},
	includeUnknown: false
};

$.translate.ui = function(){
	var o = {}, str='', cs='', cl='';
	
	if(typeof arguments[0] === "string")
		o.tags = $.makeArray(arguments);
	else o = arguments[0];
	
	o = $.extend({}, defaults, $.translate.ui.defaults, o);
		
	if(o.tags[2]){
		cs = '<' + o.tags[2] + '>';
		cl = '</' + o.tags[2] + '>';
	}
	
	var languages = $.translate.getLanguages(o.filter);
	if(!o.includeUnknown) delete languages.UNKNOWN;
	
	$.each( languages, function(l, lc){
		str += ('<' + o.tags[1] + " value=" + lc + '>' + cs +
			//$.translate.capitalize(l) + " - " + 
			o.label(lc, l) +
			cl + '</' + o.tags[1] + '>');
	});

	return $('<' + o.tags[0] + ' class="jq-translate-ui">' + str + '</' + o.tags[0] + '>');

};

$.translate.ui.defaults = $.extend({}, defaults);


})(jQuery);
