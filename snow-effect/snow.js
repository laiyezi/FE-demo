window.onload = function() {
	// 初始化
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// 画布尺寸
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;


	// ***雪花***
	var mp = 22;//雪花最大数
	var particles = [];//所有雪花集
	// 循环创建mp个雪花，随机坐标位置，雪花半径
	for(var i = 0; i < mp; i++){
		particles.push({
			x: Math.random()*W,//x坐标
			y: Math.random()*H,//y坐标
			r: Math.random()*4 + 1,//半径
			//密度，后面用来改变y坐标，实现每片雪花下降速度不一样
			d: Math.random()*mp

		});
	}

// 雪花绘制
  function draw() {
  	    // 清空画布
    	ctx.clearRect(0,0,W,H);//在给定的矩形内清除指定的像素。

    	ctx.fillStyle = "rgba(255,255,255,0.8)";//设置或返回用于填充绘画的颜色、渐变或模式。

    	ctx.beginPath();//	起始一条路径，或重置当前路径。
    	
    	// 画mp个雪花
    	for(var i = 0; i < mp; i++) {
    		var p = particles[i];

    		// moveTo()把路径移动到画布中的指定点，不创建线条。
    		ctx.moveTo(p.x, p.y);
    		
    		//arc()创建弧/曲线（用于创建圆形或部分圆）。
    		// x,y:圆心的坐标，r:半径，起始角，结束角，false顺时针绘图，true:逆时针绘图
    		ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
    	}
    	ctx.fill();//填充当前绘图（路径）。

    	// 雪花飘起来
    	update();
    }


    var angle = 0;
    // 雪花飘啊飘
    function update() {
    	angle += 0.01;
    	for(var i = 0; i < mp; i++) {
    		var p = particles[i];
    		p.y += Math.cos(angle + p.d) + 1 + p.r/2;
    		p.x += Math.sin(angle) * 2;

    		if(p.x > W + 5 || p.x < -5 || p.y > H) {
    			if(i % 3 > 0) {
    				particles[i] = {
    					x: Math.random() * W,
    					y: -10,
    					r: p.r,
    					d: p.d
    				};
    			} else {
    				if(Math.sin(angle) > 0) {
    					particles[i] = {
    						x: -5,
    						y: Math.random() * H,
    						r: p.r,
    						d: p.d
    					};
    				} else {
    					particles[i] = {
    						x: W + 5,
    						y: Math.random() * H,
    						r: p.r,
    						d: p.d
    					};
    				}
    			}
    		}
    	}
	}
   	setInterval(draw,22);

}
    
  