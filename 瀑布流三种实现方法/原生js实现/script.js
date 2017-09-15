// 1.瀑布流排列
     // 1.图片宽度，每行列数计算获取等

     // 2.瀑布流排列。获取第一行所有图片的高度，下一张图片排在最矮的图片下面
     // （absolute,top:最矮图片的高,left：距左侧的距离）。图片都指盒子
     // 更新高度，最矮图片高度加上新加入图片的高度，循环。

// 2.后续图片加载

window.onload = function() {
	waterfall('main', 'box');

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
	var i = 0
	window.onscroll = function() {
		// 源码for循环会无限加载，这里数据库内容加载完停止加载
		if (checkScrollSlide() && i < len) {
			
			var oParent = document.getElementById('main');
            // for (var i = 0; i < dataInt.data.length; i++) {
            	
            	var oBox = document.createElement('div');
            	oBox.className = 'box';
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                var oImg = document.createElement('img');
                oImg.src = "images/" + dataInt.data[i].src;

                oPic.appendChild(oImg);
                oBox.appendChild(oPic);
            	oParent.appendChild(oBox);
            i++;

            // }
            	            
            waterfall('main', 'box');

		}
	}

}


// 瀑布流
function waterfall(parent, box) {
	// 将id为main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);

    // 计算整个页面显示的列数（页面宽/box宽）
    var oBoxW = oBoxs[0].offsetWidth;//一个盒子宽
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);

    // console.log(col);
    // 设置main的宽
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';
    var hArr = [];

    for (var i = 0; i < oBoxs.length; i++) {
    	if (i < cols) {
    		hArr.push(oBoxs[i].offsetHeight);
    	} else {
    		// 求一行图片高度的最小值和下标
    		var minH = Math.min.apply(null,hArr);
    		var index = getMinhIndex(hArr, minH);

    		// 第二行图片在上行最矮图片的下方，它的定位是最矮图片box的高度及其距左侧的距离 
    		oBoxs[i].style.position = 'absolute';
    		oBoxs[i].style.top = minH + 'px';
    		// oBoxs[i].style.left = oBoxW * index;//图片宽度*前面图片个数=据左侧的距离
    		oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';

    		//更新高度，新加入的高度一起计算
    		hArr[index] += oBoxs[i].offsetHeight;
    	}
    }
    // console.log(hArr);
}

// 取出parent里所有class为clsName的元素
function getByClass(parent, clsName) {
    var boxArr = []; //用来存储所有获取到的class为clsName元素
    oElements = parent.getElementsByTagName('*');

    for (var i = 0; i < oElements.length; i++) {
    	if (oElements[i].className == clsName) {
    		boxArr.push(oElements[i]);
    	}
    }

    return boxArr;
}

// 这是求一行6张图片中最矮图片的下标
function getMinhIndex(arr, val) {
	for (var i in arr){
		if (arr[i] == val){
			return i;
		}
	}
}


// 检测是否滚条加载页面的条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent, 'box');
    // 最后一个box距离页面内容顶部的距离+box一半的高度
    // var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    // 这里我使用 图片露头就加载
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop;
    
    // 滚动距离
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 可视窗口高度
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    
    // 这里如果不理解，可以换个思路，lastBoxH - scrollTop = 图片据可视窗口顶部的距离，
    // 如果这个距离 < 可视窗口高度，开始加载
    return (lastBoxH < scrollTop + height) ? true : false;
    

}