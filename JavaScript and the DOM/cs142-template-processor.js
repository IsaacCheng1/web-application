'use strict';

function Cs142TemplateProcessor(template) {
	this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
	var temp = this.template;
	var re;
	for (var key in dictionary) {
		re = new RegExp('{{' + key +'}}');
		temp = temp.replace(re, dictionary[key]);
	}
	re = /{{\w+}}/;
	temp = temp.replace(re, ' ');
	return temp;
};