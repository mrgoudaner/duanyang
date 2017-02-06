/*
* @Author: Administrator
* @Date:   2017-02-05 20:44:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-06 11:24:11
*/

'use strict';
function Note(){
	this.title='';
	this.cont='';
}
Note.prototype={
	bindDom:function(){
		 
		var arr=[];
		arr.push('<li>');
		arr.push('<h3 class="text-left bg-info" id="'+this.title+'">'+this.title+'</h3>');
		arr.push('<p class="text-justify">'+this.cont+'</p>');
		arr.push('</li>');
     	return arr;
	},
	bindTitle:function(){
		var arrtitle=[];
		arrtitle.push('<li><a href="#'+this.title+'"><h4>'+this.title+'</h4></a></li>');
		return arrtitle;
	}
}

$(function(){
		var notecont='';
		var lefttitle ='';
		for(var i=0;i<data.length;i++){
			var note=new Note();
			note.title=data[i].title;
			note.cont=data[i].cont;
			notecont+=note.bindDom().join("");
			lefttitle+=note.bindTitle().join("");
		}
		$("#note").html(notecont);
		$("#title").html(lefttitle);


})

