var score = 0;
var shapeDim = 75;
var startPlaying = false
var isNextable = true;
var timeValue = 2000;
var lives = new Array();
var settingShown = false;
var cols = 2; // starting columns
var rows = 2; // starting rows
var matchCount = 0;
var pictureNum1;
var pictureNum2;
var match = [0,0];
var matchPic =" ";
var matchPic2 = " ";
var pictures1=["selectedUNC","selectedHateDuke","selectedKentucky","selectedKansas","selectedECU","selectedOhioState","selectedRutgers","selectedNCstate"];  //colleges
var pictures2= ["selectedDog","selectedCat","selectedPenguin", "selectedBluebird","selectedTurkey","selectedHorse","selectedZebra","selectedLion"];  //animals
var pictures3=["selectedFootball","selectedBaseball","selectedSoccer","selectedPuck","selectedBalls","selectedFrisbee","selectedStick","selectedBasketball"]; //sports objects
var pictures4 = ["selectedBaby","selectedManOld","selectedBlackMan","selectedIndianWoman","selectedBishop","selectedAsianMan","selectedWhiteWoman","selectedBradPitt"]; //people
var picArray  = [pictures1,pictures2,pictures3,pictures4];
var item1;
var item2;
var circlesChosen = 0;
var totalSelected;
var preventPickSame ="filler";
// Get value


$(document).ready(function() {
	next(cols, rows);
	$('#restart').click(function(){
		location.reload();
	});

	$('#resume').click(function(){
		isNextable=true;
		if(!$('#checkSwitch').is(':checked')){
			shapeDim = 175;
		};
		next(cols, rows);
		$(".container").show();

		next(cols, rows);
		$(".container").show();
		$("#resume").hide(); 
	});

	$('#eyeGaze').click(function(){
		shapeDim = 175;
	});

	for(i=0;i<3;i++){
		lives[i] = new Image();
		lives[i].src = 'life.png';
		$("#lives").append($("<a>", {
			html: $("<img>", { src: lives[i].src, height: 30, width: 30, class: 'animated rollIn' })
		}));
	}


	$('.settingsIcon').click(function() {
		startPlaying = true;
		$(".container").hide();
		$("#resume").show();
	});

	new jBox('Modal',{ //creates Settings box
		width: 325,
		height: 200,
		attach: $('.settingsIcon'),
		title: '<div class = "settingsText animated zoomIn"> Settings</div>',
		content: $('#settings')
	});

	$(".timeSlider").bind("slider:changed", function (event, data) {
		// The currently selected value of the slider
		timeValue = data.value;
		timeValue1=data.value;
	});
});

function endGame(cols, rows) {
	$(".content").hide();
	$(".FinishScreen").show();
	$("#restart").fadeIn(3000);


	$(".ScoreReminder").text("Your highest block: " + cols + "x" + rows);
	$(".content").html("<audio src = 'sounds/gameover.mp3' type = 'audio/mp3' autoplay></audio>\
			<audio src = 'sounds/gamover.ogg' type = 'audio/ogg' autoplay></audio>");
} 

function next(c, r) {
	if (!isNextable) {
		return;
	}
	if($('#eyeGaze').is(':checked'))
	{
		shapeDim=175;
	}
	if(!$('#eyeGaze').is(':checked'))
	{
		shapeDim=75;
	}
	totalSelected = 0;
	preventPickSame = "fillerStuff";
	matchCount = 0;
	isNextable = false;
	$("#resume").hide();
	$(".content").fadeOut(1500, function() { // time after every correct answer
		$(".content").empty();
		$(".container").animate({
			height: ((shapeDim + 8) * r) + "px",
			width: ((shapeDim + 8) * c) + "px"
		}, 1000, function() {
			for (i = 0; i < (c * r); i++){
				$(".content").append(createShape("circle", shapeDim));
			}

			$('html, body').animate({ 
				scrollTop: $(document).height()-$(window).height()}, "slow" // scroll to bottom after each level
					);
			$(".content").fadeIn(500);
			pickRandomShapes();
		})
	});
}

function createShape(type, r) {
	return $("<div>").addClass("shape " + type).width(r).height(r).click(function() {
		if (startPlaying) {

			var countLength = $(".content > .shape").length;
			for(ind = 0; ind < pictures1.length; ind++)

			{
				if ($(this).attr(picArray[0][ind]) == picArray[0][ind] && $(this).attr(picArray[0][ind])!=preventPickSame &&  startPlaying==true)
				{
					$(this).addClass(picArray[0][ind]);
					$(this).css('opacity', '0.5');
					circlesChosen++;
					if(circlesChosen==1)
					{
						match[0]=1;
					}
					else if(circlesChosen==2)
					{
						match[1]=1;
					}

					if(matchPic ==" ")
					{
						preventPickSame = $(this).attr(picArray[0][ind]);
						item1 = $(this);
						$(this).html("<audio src = 'sounds/correct.mp3' type = 'audio/mp3' autoplay></audio>\
								<audio src = 'sounds/correct.ogg' type = 'audio/ogg' autoplay></audio>");
								var ind1 = ind;
								matchPic = picArray[0][ind];
					}
					else  
					{
						var item2=$(this);
						var ind2 = ind;
						matchPic2 = picArray[0][ind];
					}
				}

				else if ($(this).attr(picArray[1][ind]) == picArray[1][ind]  && $(this).attr(picArray[1][ind])!=preventPickSame && startPlaying==true)
				{
					$(this).addClass(picArray[1][ind]);
					$(this).css('opacity', '0.5');
					circlesChosen++;
					if(circlesChosen==1)
					{
						match[0]=2;
					}
					else if(circlesChosen==2)
					{
						match[1]=2;
					}


					if(matchPic ==" ")
					{
						preventPickSame = $(this).attr(picArray[1][ind]);
						item1 = $(this);
						$(this).html("<audio src = 'sounds/correct.mp3' type = 'audio/mp3' autoplay></audio>\
								<audio src = 'sounds/correct.ogg' type = 'audio/ogg' autoplay></audio>");
								var ind1 = ind;
								matchPic = picArray[1][ind];
					}
					else  
					{
						item2=$(this);
						var ind2 = ind;
						matchPic2 = picArray[1][ind];
					}
				}
				else if ($(this).attr(picArray[2][ind]) == picArray[2][ind]  && $(this).attr(picArray[2][ind])!=preventPickSame && startPlaying==true)
				{
					$(this).addClass(picArray[2][ind]);
					$(this).css('opacity', '0.5');
					circlesChosen++;
					if(circlesChosen==1)
					{
						match[0]=3;
					}
					else if(circlesChosen==2)
					{
						match[1]=3;
					}


					if(matchPic ==" ")
					{
						preventPickSame = $(this).attr(picArray[2][ind]);
						item1 = $(this);
						$(this).html("<audio src = 'sounds/correct.mp3' type = 'audio/mp3' autoplay></audio>\
								<audio src = 'sounds/correct.ogg' type = 'audio/ogg' autoplay></audio>");
								var ind1 = ind;
								matchPic = picArray[2][ind];
					}
					else  
					{
						item2=$(this);
						var ind2 = ind;
						matchPic2 = picArray[2][ind];
					}
				}

				else if ($(this).attr(picArray[3][ind]) == picArray[3][ind]  && $(this).attr(picArray[3][ind])!=preventPickSame && startPlaying==true)
				{
					$(this).addClass(picArray[3][ind]);
					$(this).css('opacity', '0.5');
					circlesChosen++;
					if(circlesChosen==1)
					{
						match[0]=4;
					}
					else if(circlesChosen==2)
					{
						match[1]=4;
					}


					if(matchPic ==" ")
					{
						preventPickSame = $(this).attr(picArray[3][ind]);
						item1 = $(this);
						$(this).html("<audio src = 'sounds/correct.mp3' type = 'audio/mp3' autoplay></audio>\
								<audio src = 'sounds/correct.ogg' type = 'audio/ogg' autoplay></audio>");
								var ind1 = ind;
								matchPic = picArray[3][ind];
					}
					else  
					{
						item2=$(this);
						var ind2 = ind;
						matchPic2 = picArray[3][ind];
					}
				}



			}

			totalSelected = circlesChosen;

			//  if(matchCount <= (countLength/2)-1 &&  totalSelected!=2)


			if  (totalSelected >= 2)
			{
				startPlaying=false; //for bug prevention - wait for animations
				preventPickSame="preventPickSame";
				circlesChosen=0;
				totalSelected = 0;

				if(match[0] == match[1])
				{
					matchCount++;
					$(this).html("<audio src = 'sounds/correct.mp3' type = 'audio/mp3' autoplay></audio>\
							<audio src = 'sounds/correct.ogg' type = 'audio/ogg' autoplay></audio>");


							var score = parseInt($("#score").html());
							score += 20;
							$("#score").html(score);

							item1.removeAttr(matchPic);
							item2.removeAttr(matchPic2);


							item1.fadeOut(1500, function() {  	
								$(item1).css('opacity', '0.0')
								item1.removeClass(matchPic).removeClass("sel");
							}).fadeIn(10);

							item2.fadeOut(1500, function() { 
								$(item2).css('opacity', '0.0')
								item2.removeClass(matchPic2).removeClass("sel");
								matchPic =" ";
								matchPic2 = " ";
								startPlaying=true;}).fadeIn(10);

				}
				else
				{

					lives.splice(-1, 1);
					$('#lives a').eq(lives.length).remove();

					if (lives.length <= 0){
						return endGame(cols, rows);
					}

					$(this).html("<audio src = 'sounds/wrong.mp3' type = 'audio/mp3' autoplay></audio>\
							<audio src = 'sounds/wrong.ogg' type = 'audio/ogg' autoplay></audio>");
							var score = parseInt($("#score").html());
							score -= 10;
							$("#score").html(score);

							item1.fadeOut(1500, function() {  	
								$(item1).css('opacity', '1.0');
							}).fadeIn(10);

							item2.fadeOut(1500, function() { 
								$(item2).css('opacity', '1.0');
								matchPic =" ";
								matchPic2 = " ";
								startPlaying=true;}).fadeIn(10);

				}
				if(matchCount >= (rows*cols)/2)
				{
					if((cols+rows)%4 == 0 || (cols+rows)%4 == 1 || (cols+rows)%4 == 2)
					{
						$(".content").html("\
								<div style = 'position: absolute; left:750px; top: 265px'> <img class='animated lightSpeedIn' src='nyancat.gif' height='80' width='140'></div>\
								<audio src = 'sounds/1-up.mp3' type = 'audio/mpeg' autoplay></audio>\
								<audio src = 'sounds/1-up.ogg' type = 'audio/ogg' autoplay></audio>");
					}

					else if((cols+rows)%4 == 3 && !$('#checkSwitch').is(':checked'))
					{
						$(".content").html("\
								<div style = 'position: absolute; left: 785px; top: 280px'> <img class='animated wobble' src='1up.png' height='50' width='50'></div>\
								<audio src='sounds/coin.mp3' type='audio/mpeg' autoplay></audio>\
								<audio src='sounds/coin.ogg' type='audio/ogg' autoplay></audio>");                    
								lives.splice(lives.length, 0, 1);
								$("#lives").append($("<a>", 
										{
									html: $("<img>", { src: 'life.png', height: 30, width: 30, class: 'animated zoomIn' })
										}));
					}
					matchCount = 0;
					isNextable=true;

					if(cols == 5 && rows == 4) //MAX ROW & COL
					{
						next(cols,rows);
					}

					else if(cols == rows && !$('#checkSwitch').is(':checked'))
					{
						cols++;
					}
					else  if(!$('#checkSwitch').is(':checked'))
					{
						rows++;
					}
					
					if(rows * cols == 9 || rows * cols == 15 || rows * cols == 25 || rows * cols == 35 || rows * cols == 49)
						{
							if(!$('#checkSwitch').is(':checked'))
							{
								cols++;
							}
						}
					

					next(cols,rows);
				}
			}
		}
	});
}

function pickRandomShapes() {


	pictures1 = shuffle(pictures1);
	pictures2 = shuffle(pictures2);
	pictures3 = shuffle(pictures3);
	pictures4 = shuffle(pictures4);
	picArray = shuffle(picArray);
	var length = $(".content > .shape").length;
	var pair = 0;

	for(count = 0; count < length; count++)
	{
		if(count ==0)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) {
					$(".content > .circle").eq(random).addClass(picArray[0][0]).addClass("sel").attr(picArray[0][0], picArray[0][0]);
				}
				else count--;

			}
		}
		else if(count ==1)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[1][0]).addClass("sel").attr(picArray[1][0], picArray[1][0]);
				}

				else  count--;

			}
		}

		else if(count ==2)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[0][1]).addClass("sel").attr(picArray[0][1], picArray[0][1]);
				}

				else  count--;

			}
		}

		else if(count ==3)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[1][1]).addClass("sel").attr(picArray[1][1], picArray[1][1]);
				}

				else  count--;

			}
		}

		else if(count ==4)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[0][2]).addClass("sel").attr(picArray[0][2], picArray[0][2]);
				}

				else  count--;

			}
		}

		else if(count ==5)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[0][3]).addClass("sel").attr(picArray[0][3], picArray[0][3]);
				}

				else  count--;

			}
		}

		else if(count ==6)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[1][2]).addClass("sel").attr(picArray[1][2], picArray[1][2]);
				}

				else  count--;

			}
		}

		else if(count ==7)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[1][3]).addClass("sel").attr(picArray[1][3], picArray[1][3]);
				}

				else  count--;

			}
		}

		else if(count ==8)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[2][0]).addClass("sel").attr(picArray[2][0], picArray[2][0]);
				}

				else  count--;

			}
		}

		else if(count ==9)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[2][1]).addClass("sel").attr(picArray[2][1], picArray[2][1]);
				}

				else  count--;

			}
		}

		else if(count ==10)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[2][2]).addClass("sel").attr(picArray[2][2], picArray[2][2]);
				}

				else  count--;

			}
		}

		else if(count ==11)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[2][3]).addClass("sel").attr(picArray[2][3], picArray[2][3]);
				}

				else  count--;

			}
		}

		else if(count ==12)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[3][0]).addClass("sel").attr(picArray[3][0], picArray[3][0]);
				}

				else  count--;

			}
		}

		else if(count ==13)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[3][1]).addClass("sel").attr(picArray[3][1], picArray[3][1]);
				}

				else  count--;

			}
		}

		else if(count ==14)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[3][2]).addClass("sel").attr(picArray[3][2], picArray[3][2]);
				}

				else  count--;

			}
		}

		else if(count ==15)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[3][3]).addClass("sel").attr(picArray[3][3], picArray[3][3]);
				}

				else  count--;

			}
		}

		else if(count ==16)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[0][4]).addClass("sel").attr(picArray[0][4], picArray[0][4]);
				}

				else  count--;

			}
		}

		else if(count ==17)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[0][5]).addClass("sel").attr(picArray[0][5], picArray[0][5]);
				}

				else  count--;

			}
		}

		else if(count ==18)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[1][4]).addClass("sel").attr(picArray[1][4], picArray[1][4]);
				}

				else  count--;

			}
		}

		else if(count ==19)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{

				if (!$(".content > .circle").eq(random).hasClass("sel")) 
				{
					$(".content > .circle").eq(random).addClass(picArray[1][5]).addClass("sel").attr(picArray[1][5], picArray[1][5]);
				}

				else  count--;

			}
		}

	}

	if($('#eyeGaze').is(':checked'))
	{
		$(".circle").css({ 
			"background-size": "175px 175px"
		});

	}
	startPlaying = true;
	var timeValue1 = $('.timeSlider').val(); 
	
}

function shuffle(array) {
	var counter = array.length, temp, index;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}


