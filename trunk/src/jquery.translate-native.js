/*!-
 * Native language names extension for the jQuery Translate plugin 
 * Version: ${version}
 * http://code.google.com/p/jquery-translate/
 */
;(function($){
$.translate.extend({
	//TODO: maybe an inverse function
	toNativeLanguage: function(lang){ 
		return $.translate.nativeLanguages[ lang ] || 
			$.translate.nativeLanguages[ $.translate.toLanguageCode(lang) ];
	},

	translateLanguages: function(languages, callback){
		delete languages.UNKNOWN;
		var deferred = []; //instances to be executed later are collected here
		$.each(languages, function(l, lc){
			if( $.translate.nativeLanguages[lc] ) return;
			console.log(lc);
			deferred.push( $.translate.defer( $.translate.capitalize(l), "en", lc, function(tr){					
					$.translate.nativeLanguages[lc] = tr;
				}) );
		});
		if(!deferred.length) callback();
		else $.translate.run(deferred, callback);
	},
	
	nativeLanguages: {
		"af":"Afrikaans",
		"be":"Беларуская",
		"is":"Íslenska",
		"ga":"Gaeilge",
		"mk":"Македонски",
		"ms":"Bahasa Melayu",
		"sw":"Kiswahili",
		"cy":"Cymraeg",
		"yi":"ייִדיש",
		
		"sq":"Shqipe",
		"ar":"العربية",
		"bg":"Български",
		"ca":"Català",
		"zh":"中文",
		"zh-CN":"简体中文",
		"zh-TW":"繁體中文",
		"hr":"Hrvatski",
		"cs":"Čeština",
		"da":"Dansk",
		"nl":"Nederlands",
		"en":"English",
		"et":"Eesti",
		"tl":"Tagalog",
		"fi":"Suomi",
		"fr":"Français",
		"gl":"Galego",
		"de":"Deutsch",
		"el":"Ελληνικά",
		"iw":"עברית",
		"hi":"हिन्दी",
		"hu":"Magyar",
		"id":"Bahasa Indonesia",
		"it":"Italiano",
		"ja":"日本語",
		"ko":"한국어",
		"lv":"Latviešu",
		"lt":"Lietuvių",
		"mt":"Malti",
		"no":"Norsk",
		"fa":"فارسی",
		"pl":"Polski",
		"pt-PT":"Português",
		"ro":"Român",
		"ru":"Русский",
		"sr":"Српски",
		"sk":"Slovenský",
		"sl":"Slovenski",
		"es":"Español",
		"sv":"Svenska",
		"th":"ไทย",
		"tr":"Türkçe",
		"uk":"Українська",
		"vi":"Tiếng Việt"
	}

});

})(jQuery);