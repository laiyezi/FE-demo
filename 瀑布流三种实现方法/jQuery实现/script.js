$(window).on('load', function() {
    waterfall();
    	var dataInt = { 
	"data":[{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},
            {"src":'27.jpg'},{"src":'28.jpg'},{"src":'29.jpg'},{"src":'30.jpg'},
            {"src":'31.jpg'},{"src":'32.jpg'},{"src":'33.jpg'},{"src":'34.jpg'},
            {"src":'35.jpg'},{"src":'36.jpg'},{"src":'37.jpg'},{"src":'38.jpg'},
            {"src":'39.jpg'},{"src":'40.jpg'},{"src":'41.jpg'},{"src":'42.jpg'},
            {"src":'43.jpg'},{"src":'44.jpg'},{"src":'45.jpg'},{"src":'46.jpg'},
            {"src":'47.jpg'},{"src":'48.jpg'},{"src":'49.jpg'},{"src":'50.jpg'}

            ]};

    var len = dataInt.data.length;
    var i = 0;

    $(window).on('scroll',function() {
  
    	if(checkScrollSlide() && i < len) {

			var oBox = $('<div>').addClass('box').appendTo($('#main'));

			var oPic = $('<div>').addClass('pic').appendTo(oBox);
			
			$('<img>').attr('src','images/' + dataInt.data[i].src).appendTo(oPic);

			i++;
    	};
    		
    	waterfall();
    });

    // $(window).on('scroll',function() {
  
    // 	if(checkScrollSlide()) {
    // 		// 循环会造成无限加载
    // 		$.each(dataInt.data, function(key, value) {

    // 			var oBox = $('<div>').addClass('box').appendTo($('#main'));

    // 			var oPic = $('<div>').addClass('pic').appendTo(oBox);

    // 			$('<img>').attr('src','images/' + $(value).attr('src')).appendTo(oPic);
    // 		});
    		
    // 		waterfall();


    // 	}
    // });

});

function waterfall() {
	var $boxs = $('#main>div');
    // 一个图片格子的宽度
	var w = $boxs.eq(0).outerWidth();
	// 列数
	var cols = Math.floor($(window).width()/w);
    // 设置#main的宽度并居中
    $('#main').width(w*cols).css('margin','0 auto');

    var hArr = [];
    $boxs.each(function(index, value) {
    	// 每张图片盒子的高度
        var h = $boxs.eq(index).outerHeight();
        if (index < cols) {
        	// 第一行每张图片高度的数组
            hArr.push(h);
        } else {
        	// 一行高度的最小值
        	var minH = Math.min.apply(null,hArr);
        	// 高度最小值的索引
        	// 	inArray: function( elem, arr, i ) {
			// 	    return arr == null ? -1 : indexOf.call( arr, elem, i );
			//  },
        	var minHIndex = $.inArray(minH, hArr);
        	// value是dom对象,需要转换为jquery对象才能使用jquery方法
        	$(value).css({
        		'position':'absolute',
        		'top':minH + 'px',
        		'left': minHIndex * w + 'px'
        	});
        	// 更新高度数组的值
        	hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }

    });
    

}

function checkScrollSlide() {
	var $lastBox = $("#main>div").last();
	// 最后一个盒子距离内容顶部距离 + 半个盒子高度（也就是什么时候加载，可自定义）
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
    // 滚动距离
	var scrollTop = $(window).scrollTop();
	// 窗口高度
	var documentH = $(window).height();

	return (lastBoxDis < documentH + scrollTop) ? true : false;

}

	