/*
* @Author: Administrator
* @Date:   2017-02-06 11:35:43
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-06 17:22:59
*/

'use strict';
function Pic(){
	this.title=''
	this.src='';
}
Pic.prototype={
	bindPic:function(){
		var arr=[];
		arr.push('<div class="pic">');
		arr.push('<div class="box">');
		arr.push('<img src="img/'+this.src+'.jpg"/>');
		arr.push('<p class="text-center">'+this.title+'</p>');
		arr.push('</div>');
		arr.push('</div>');
			return arr;         
	}
}
/*实例化遍历数据*/
$(function(){
	var pic1 ='';
	for(var i=0; i<data.length; i++){
		var pic=new Pic();
		pic.title=data[i].title;
		pic.src=data[i].src;
		pic1+=pic.bindPic().join("");

	}
	$("#main").html(pic1);

})
/*鼠标经过显示标题*/
$(function(){
	$("#main img").hover(function(){
		$(this).next().fadeIn(450);
	},function(){
		$(this).next().fadeOut(450);
	})
})
	/*加载照片瀑布流*/
window.onload=function(){
	waterfall("main","pic");
}

/*function waterfall(){
    var $aPin = $( "#main>div" );
    var iPinW = $aPin.eq( 0 ).width();// 一个块框pin的宽
    var num = Math.floor( $( window ).width() / iPinW );
    $( "#main" ).width(iPinW * num);

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。

    $aPin.each( function( index, value ){
        var pinH = $aPin.eq( index ).outerHeight();
        if( index < num ){
            pinHArr[ index ] = pinH; 
        }else{
            var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
            var minHIndex = $.inArray( minH, pinHArr );
            $( value ).css({
                'position': 'absolute',
                'top': minH + 15,
                'left': $aPin.eq( minHIndex ).position().left
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[ minHIndex ] += $aPin.eq( index ).height() + 15;//更新添加了块框后的列高
        }
    });
}*/


function waterfall(parent,pin){
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getClassObj(oParent,pin);// 获取存储块框pin的数组aPin
    var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
    var num=Math.floor(document.documentElement.clientWidth/iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<aPin.length;i++){//遍历数组aPin的每个块框元素
        var pinH=aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i]=pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH
            var minHIndex=getminHIndex(pinHArr,minH);
            aPin[i].style.position='absolute';//设置绝对位移
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/****
    *通过父级和子元素的class类 获取该同类子元素的数组
    */
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}
/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
