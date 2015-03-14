This plugin integrates the Google Ajax Language API `[*]` to jQuery. You can just call e.g. $('body').translate('en') but provides callbacks for each translated element too. Or you can pass an array to $.translate to get back a translated array. Currently you can only send a limited amount of characters with the raw API per request but this plugin calls them consecutively. It also reduces the number of requests by concatenating elements and doesn't send unnecessary html markup still providing access to each element as they've got translated.

**Please use the bug tracker on the Issues tab if you encounter any problem!**


---


**download builder:** http://jquery-translate.appspot.com/

The file in the download section is for testing only, it contains all the components, which is unnecessary in almost all cases.



---


`*` Since the free Google Translate API has been discontinued on December 1, 2011 this plugin will use the Microsoft Translator service: http://msdn.microsoft.com/en-us/library/ff512404.aspx Unfortunately there are issues with it: http://social.msdn.microsoft.com/Forums/en-US/microsofttranslator/thread/775fd592-9d40-4ca5-85a4-32ac39967c98

For now, you can try using a [modified version of the plugin](http://code.google.com/p/jquery-translate/issues/attachmentText?id=75&aid=750013000&name=jquery.translate.js&token=1L0HwLT86kEh5_-04-p8OFDPq2w%3A1323813882340) for the Bing API, see discussion [here](http://code.google.com/p/jquery-translate/issues/detail?id=75).

You just have to select the "trunk" option in the [download builder](http://jquery-translate.appspot.com/), and call `$.translate.load(bingAppId);` after the plugin is included. If you provide a Google API key it works with their paid v2 service as well.