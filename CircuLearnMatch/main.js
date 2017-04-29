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
var match = [false,true];
var matchPic =" ";
var matchPic2 = " ";
var pictures = ["selectedFootball","selectedCar","selectedCat","selectedBaseball","selectedFood","selectedDog","selectedBoat","selectedBaby","selectedDrink","selectedManOld","selectedUNC","selectedHateDuke"];
// Get value


$(document).ready(function() {
    next(cols, rows);
    $('#restart').click(function(){
		location.reload();
    });

    $('#resume').click(function(){
        startPlaying = false;
        if(!$('#checkSwitch').is(':checked')){
                shapeDim = 175;
           };
        next(cols, rows);
        $(".container").show();
   
        //next(cols, rows);
        /* $(".container").show();
	$("#resume").hide(); */
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
			 for(ind = 0; ind < pictures.length; ind++)
			 
			 {
			   if ($(this).attr(pictures[ind]) == pictures[ind]){
                     $(this).addClass(pictures[ind]).addClass("sel");
				
				if(matchPic ==" ")
			 {
			 item1 = $(this);
			 var ind1 = ind;
			  matchPic = pictures[ind];
			  }
			  else  
			  {
			  item2=$(this);
			  var ind2 = ind;
			  matchPic2 = pictures[ind];
			  }
                }
			 }
		            var totalSelected = $(".content > .sel").length;
			 
			 if(matchCount <= (countLength/2)-1 &&  totalSelected!=2)
			 {
			  $(this).html("<audio src = 'sounds/correct.mp3' type = 'audio/mp3' autoplay></audio>\
                        <audio src = 'sounds/correct.ogg' type = 'audio/ogg' autoplay></audio>");
			}
		
				if  (totalSelected >= 2)
				{
					
					startPlaying=false; //for bug prevention - wait for animations
					
					totalSelected = 0;
					match[0]  = $(".content > .sel").eq(0).hasClass(matchPic);
					match[1]  = $(".content > .sel").eq(1).hasClass(matchPic);
					if(match[0] == match[1])
					{
					matchCount++;
					  if(matchCount <= (countLength/2)-1)
					{
						$(this).html("<audio src = 'sounds/correct.mp3' type = 'audio/mp3' autoplay></audio>\
                        <audio src = 'sounds/correct.ogg' type = 'audio/ogg' autoplay></audio>");
					}
					
					var score = parseInt($("#score").html());
					score += 20;
					$("#score").html(score);
					
					$(".content > .sel").css('background-color', 'white');
					$(".content > .sel").css('opacity', '0.0');
					item1.removeAttr(matchPic);
					item2.removeAttr(matchPic);
					
					
					item1.fadeOut(1500, function() {  	
					item1.removeClass(matchPic).removeClass("sel");
					}).fadeIn(10);
					
					item2.fadeOut(1500, function() { 
					item2.removeClass(matchPic).removeClass("sel");
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
					item1.removeClass(matchPic).removeClass("sel");
					}).fadeIn(10);
					
					item2.fadeOut(1500, function() { 
					item2.removeClass(matchPic2).removeClass("sel");
					 matchPic =" ";
					 matchPic2 = " ";
					startPlaying=true;}).fadeIn(10);
					
					}
					if(matchCount >= countLength/2)
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
						
						if(cols == 5 && rows == 4) //MAX ROW & COL
							next(cols,rows);
						
						if(cols == rows && !$('#checkSwitch').is(':checked'))
							cols++;
						else  if(!$('#checkSwitch').is(':checked'))
							rows++;
						if(rows * cols == 9 || rows * cols == 15 || rows * cols == 25 || rows * cols == 35 || rows * cols == 49)
						{
							if(!$('#checkSwitch').is(':checked'))
							{
								cols++;
							}
						}
						
						startPlaying=false;
						next(cols,rows);
					}
				}
            }
        });
}

function pickRandomShapes() {


  pictures = shuffle(pictures);
   var length = $(".content > .shape").length;
  var pair = 0;
	
	for(count = 0; count < length; count++)
	{
		if(count <=1)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{
			
				if (!$(".content > .circle").eq(random).hasClass("sel")) {
					$(".content > .circle").eq(random).addClass(pictures[0]).addClass("sel").attr(pictures[0], pictures[0]);
			}
			else count--;
			
			}
		}
		else if(count <=3)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{
			
			if (!$(".content > .circle").eq(random).hasClass("sel")) 
			{
					$(".content > .circle").eq(random).addClass(pictures[1]).addClass("sel").attr(pictures[1], pictures[1]);
			}
				
			else  count--;
			
			}
		
		}
		else if(count <=5)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{
			
			if (!$(".content > .circle").eq(random).hasClass("sel")) 
			{
					$(".content > .circle").eq(random).addClass(pictures[2]).addClass("sel").attr(pictures[2], pictures[2]);
			}
				
			else  count--;
			
			}
		
		}
		
		else if(count <=11)
		{
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{
			
			if (!$(".content > .circle").eq(random).hasClass("sel"))
			{
					if(pair < 2)
					{
					$(".content > .circle").eq(random).addClass(pictures[3]).addClass("sel").attr(pictures[3], pictures[3]);
					pair++;
					}
					
					else if(pair < 4)
					{
					$(".content > .circle").eq(random).addClass(pictures[4]).addClass("sel").attr(pictures[4], pictures[4]);
					pair++;
					}
					
					else if(pair < 6)
					{
					$(".content > .circle").eq(random).addClass(pictures[5]).addClass("sel").attr(pictures[5], pictures[5]);
					pair++;
					if(pair==6) pair=0;
					}
			}
				
			else  count--;
			
			}
		
		}
		else if(count <=15)
		{
		
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{
			
			if (!$(".content > .circle").eq(random).hasClass("sel"))
			{
		
					if(pair < 2)
					{
					$(".content > .circle").eq(random).addClass(pictures[6]).addClass("sel").attr(pictures[6], pictures[6]);
					pair++;
					}
					
					else if(pair < 4)
					{
					$(".content > .circle").eq(random).addClass(pictures[7]).addClass("sel").attr(pictures[7], pictures[7]);
					pair++;
					if(pair==4) pair=0;
					}
			}
				else  count--;
		
			}
	
		}
		
		else if(count <=19)
		{
		
			var random = Math.floor(Math.random() * length);
			if (random < length) 
			{
			
			if (!$(".content > .circle").eq(random).hasClass("sel"))
			{
		
					if(pair < 2)
					{
					$(".content > .circle").eq(random).addClass(pictures[8]).addClass("sel").attr(pictures[8], pictures[8]);
					pair++;
					}
					
					else if(pair < 4)
					{
					$(".content > .circle").eq(random).addClass(pictures[9]).addClass("sel").attr(pictures[9], pictures[9]);
					pair++;
					if(pair==4) pair=0;
					}
			}
				else  count--;
		
			}
	
		}
	}
	
if($('#eyeGaze').is(':checked'))
{
	$(".selectedBaby").css({ 
     "background-size": "175px 175px"
});

$(".selectedBaseball").css({ 
     "background-size": "175px 175px"
});

 $(".selectedCat").css({ 
     "background-size": "175px 175px"
});

 $(".selectedDog").css({ 
     "background-size": "175px 175px"
});

 $(".selectedUNC").css({ 
     "background-size": "175px 175px"
});

 $(".selectedFood").css({ 
     "background-size": "175px 175px"
});

 $(".selectedHateDuke").css({ 
     "background-size": "175px 175px"
});

 $(".selectedBoat").css({ 
     "background-size": "175px 175px"
});

 $(".selectedCar").css({ 
     "background-size": "175px 175px"
});

 $(".selectedDrink").css({ 
     "background-size": "175px 175px"
});

 $(".selectedFootball").css({ 
     "background-size": "175px 175px"
});

 $(".selectedManOld").css({ 
     "background-size": "175px 175px"
});

}
	startPlaying = false;
	var timeValue1 = $('.timeSlider').val(); 
     if (timeValue1 === undefined || timeValue1 === null)
	{
	 window.setTimeout(hideRandomSelectedShapes, timeValue);
	 }
	 else
	 {
	 window.setTimeout(hideRandomSelectedShapes, timeValue1);
	 }
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


function hideRandomSelectedShapes() {
	
	var length1=pictures.length;
	for(var i=0; i < length1; i++)
	{
		 $(".content > .circle").removeClass(pictures[i]).removeClass("sel");
	}
   
     
    startPlaying = true;
    isNextable = true;
}