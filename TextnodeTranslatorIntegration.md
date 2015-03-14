Sometimes inline html tags can be rearranged (merged, created, removed) during the translation, because the translation service can't exactly determine their position in the other language. In some cases this can lead to problems if there are events bound to the translated elements.

~~By using Ariel Flesler's [Textnode Translator](http://flesler.blogspot.com/2008/05/textnode-translator-for-javascript.html) you can avoid these issues, but most of the options listed on the TranslateMethod page won't work.~~

Since 1.4.2 it supports `fromOriginal, toggle, data, setLangAttr, replace` options, so it should work just like `.translate()`.

The translation data is stored at `$(el).data("translation")[language]` in an array.

You have to use the `translateTextNodes` jQuery method:


```
$("body").translateTextNodes("en", "de", {not: "a");

//or:

$("body").translateTextNodes("en", "de", {not: function(node){
  return node.nodeName != 'A';
});

```
