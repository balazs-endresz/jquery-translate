/*!-
 * Paralell extension for the jQuery Translate plugin 
 * Version: ${version}
 * http://code.google.com/p/jquery-translate/
 */

;(function($){
$.translate.extend({
	defer: function(){
		return $.translate._bind($.translate, null, arguments);
	},
	
	run: function(array, finished){
		var count = array.length;
		$.each(array, function(){
			var inst = this(),
				complete = inst.options.complete;
			inst.options.complete = function(){
				complete.apply(this, arguments);
				if(!--count) finished();
			};
		});
	}
});

})(jQuery);