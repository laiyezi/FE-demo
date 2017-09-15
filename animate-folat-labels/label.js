
// label标签分拆重组
$(".flp label").each(function() {
	var sop = '<span class="ch">';
	var scl = '</span>';
    // console.log($(this).html(sop + $(this).html().split("").join(scl + sop) + scl));
	$(this).html(sop + $(this).html().split("").join(scl + sop) + scl);
    // 注意这里' '有空格,空格转换
	$(".ch:contains(' ')").html("&nbsp");
})



var d;
// input聚焦,动画
$(".flp input").focus(function() {
	
	// 该方法包含 padding 和 border。
    //如需包含 margin，请使用 outerHeight(true)。
	var tm = $(this).outerHeight()/2*-1 + "px";
    
    // 给input相对应的label添加类，其所有子元素添加动画效果
	$(this).next().addClass("focussed").children().stop(true).each(function(i) {
		d = i * 50;
		// 每个字母动画效果延迟50毫秒，速度200毫秒，过渡效果“easeOutBack”
		$(this).delay(d).animate({top: tm}, 200, 'easeOutBack');
	})
})

// 当input失去焦点时判断输入情况，没有输入的时候label复原
$(".flp input").blur(function() {
	if($(this).val() == "") {
		$(this).next().removeClass("focussed").children().stop(true).each(function(i) {
			d = i * 50;
			$(this).delay(d).animate({top: 0}, 500, 'easeInOutBack');
		})
	}
})