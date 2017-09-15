$(document).ready(function() {
	$("#accordion h3").click(function() {
		$("#accordion ul ul").slideUp();

		if(!$(this).next().is(":visible")){
			$(this).next().slideDown();
		}
	})
})