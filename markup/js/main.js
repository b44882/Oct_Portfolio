$(function(){

	$("#focus1")
	.on('mouseenter', function(){
		$("#fimg1").attr('src', 'img/focushover1.png');
	})
	.on('mouseleave', function(){
		$("#fimg1").attr('src', 'img/focus1.png');
	});
	
	$("#focus2")
	.on('mouseenter', function(){
		$("#fimg2").attr('src', 'img/focushover2.png');
	})
	.on('mouseleave', function(){
		$("#fimg2").attr('src', 'img/focus2.png');
	});
	
	$("#focus3")
	.on('mouseenter', function(){
		$("#fimg3").attr('src', 'img/focushover3.png');
	})
	.on('mouseleave', function(){
		$("#fimg3").attr('src', 'img/focus3.png');
	});
	
	$("#focus4")
	.on('mouseenter', function(){
		$("#fimg4").attr('src', 'img/focushover4.png');
	})
	.on('mouseleave', function(){
		$("#fimg4").attr('src', 'img/focus4.png');
	});
	
	$("#focus5")
	.on('mouseenter', function(){
		$("#fimg5").attr('src', 'img/focushover5.png');
	})
	.on('mouseleave', function(){
		$("#fimg5").attr('src', 'img/focus5.png');
	});
	
	$("#focus6")
	.on('mouseenter', function(){
		$("#fimg6").attr('src', 'img/focushover6.png');
	})
	.on('mouseleave', function(){
		$("#fimg6").attr('src', 'img/focus6.png');
	});
	
	$("#focus7")
	.on('mouseenter', function(){
		$("#fimg7").attr('src', 'img/focushover7.png');
	})
	.on('mouseleave', function(){
		$("#fimg7").attr('src', 'img/focus7.png');
	});
	
	$("#focus8")
	.on('mouseenter', function(){
		$("#fimg8").attr('src', 'img/focushover8.png');
	})
	.on('mouseleave', function(){
		$("#fimg8").attr('src', 'img/focus8.png');
	});
	
	var caroImage = 1;
	
	var caroRange = function(num){
		if(num == 4){var num = 1;}
		if(num == 0){var num = 3;}
		return num;
	}
	
	var caroSwitch = function(num){
		if(num == 1){$("#carouselImage").attr('class', 'caroOne')};
		if(num == 2){$("#carouselImage").attr('class', 'caroTwo')};
		if(num == 3){$("#carouselImage").attr('class', 'caroThree')};
	};
	
	$("#caroLeft").on('click', function(){
		caroImage--;
		caroImage = caroRange(caroImage);
		caroSwitch(caroImage);
	});
	
	$("#caroRight").on('click', function(){
		caroImage++;
		caroImage = caroRange(caroImage);
		caroSwitch(caroImage);
	});	
	console.log(caroImage);
});
