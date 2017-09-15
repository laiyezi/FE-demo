// 1.点击C
// 2.点击=
// 3.点击运算符
// 4.点击.
// 5.其他,也就是数字




// 获取计算器所有的span按钮
var keys = document.querySelectorAll('#calculator span');
var operators = ['+','-','x','÷'];
var decimalAdded = false;


for(var i = 0; i < keys.length; i++) {
    // 给每个span添加点击事件实现运算
	keys[i].onclick = function(e) {

		// 获取显示区域，内容和按键的值
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
        
        // 点击C，按钮清空所有内容
		if(btnVal == 'C'){

			input.innerHTML = '';
			decimalAdded = false;

		}
		 // 点击=，计算结果并显示给screen 
		else if(btnVal == '=') {

			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
            
            // 利用正则替换方程中的x,÷为计算可识别的*,/
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

            // 如果方程的的最后一个字符是运算符或者是.，利用正则删除最后一个字符
			if(operators.indexOf(lastChar) > -1 || lastChar == '.'){
				equation = equation.replace(/.$/, '');
			}
            
			if(equation) {
				// 利用eval()计算字符串并执行其中代码最后显示
				input.innerHTML = eval(equation);
			}

			decimalAdded = false;
		} 
		// 点击运算符
		else if (operators.indexOf(btnVal) > -1) {

			var lastChar = inputVal[inputVal.length - 1];
             
            // 内容区域不为空且内容最后一个字符不是运算符，点击运算符添加到内容区
			if(inputVal != '' && operators.indexOf(lastChar) == -1){

				input.innerHTML += btnVal;

			} 

			// 如果内容区为空，且点击-，则-添加到内容区（负数）
			else if(inputVal == '' && btnVal == '-'){

				input.innerHTML += btnVal;


			}
			// 如果内容最后一个字符是运算符且内容区长度大于1，点击的运算符替换内容最后一个字符(运算符)
			
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {

				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
				
			decimalAdded = false;
		} 
		// 点击.   防止出现两个.
		else if (btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		} 
		// 点击其他按键，添加到内容区
		else {
				input.innerHTML += btnVal;
		}

		e.preventDefault();
	}
}