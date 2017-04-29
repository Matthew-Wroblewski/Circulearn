<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Memory Game</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="style.css" />
	<link rel="stylesheet" href="jBox.css" />
	<link rel="stylesheet" href="animate.css" />
	<link rel="stylesheet" href="font-awesome-animation.min.css" />
	<link rel="stylesheet" href="checkbox.css" />
	<link rel="stylesheet" href="slider css/simple-slider.css" />
	<link rel="stylesheet" href="slider css/simple-slider-volume.css" /> 
	<script src="http://code.jquery.com/jquery-2.1.0.min.js" type="text/javascript"></script>
	<script src="main.js" type="text/javascript"></script>
	<script src="slider js/simple-slider.js" type="text/javascript"></script>
	<script src="jBox.min.js" type="text/javascript"></script>
</head>
<body>
<h2 class="animated bounceInLeft">CircuLearn</h2>
<h3 class="animated bounceInUp">Remember the <span id="object"></span> circles.</h3>
<img class="divider" src="divider3.png" height="80" width="600" alt="" />

<div class="settingsIcon"> 
	<input type="image" src="settings.png" height="50" width="50" />
</div>
<h1 class = "settingsText" style = "display:none"> Settings</h1>'
<div id="settings" class = "animated zoomIn" style="display: none">
	<h3>Change the amount of time per level:</h3>
	<input class="timeSlider" type="text" data-slider="true" value="1500" data-slider-range="200,5000" data-slider-theme="volume" />
  <h3>Stay on the same level? <input type="checkbox" id="checkSwitch" /><label for="checkSwitch"></label></h3>

  <h3>Eyegaze Accessibility: <input id="eyeGaze" type ="checkbox"/><label for="eyeGaze"></label></h3>
  <h3 class="colorText">Color:</h3>
  <select style="display:inline-block;" class="colorSelect">
    <option value="blue">Blue</option>
    <option value="black">Black</option>
    <option value="gray">Gray</option>
    <option value="green" selected>Green (Default)</option>
    <option value="pink">Pink</option>
    <option value="yellow">Yellow</option>
  </select>


<h3 class="imageText">Custom Image? <input type="checkbox" id="chk" <?php if (isset($_POST['submit'])){ echo 'checked'; } ?> /></h3><br/>
<?php
    if((!empty($_FILES["uploaded_file"])) && ($_FILES['uploaded_file']['error'] == 0)) {
      //Check if the file is JPEG image and it's size is less than 350Kb
      $filename = basename($_FILES['uploaded_file']['name']);
      $ext = substr($filename, strrpos($filename, '.') + 1);
      if (($ext == "jpg") && ($_FILES["uploaded_file"]["type"] == "image/jpeg")) {
        //Determine the path to which we want to save this file
          $newname = dirname(__FILE__).'/images/'.$filename;
          //Check if the file with the same name is already exists on the server
          if (!file_exists($newname)) {
            //Attempt to move the uploaded file to it's new place
            if ((move_uploaded_file($_FILES['uploaded_file']['tmp_name'],$newname))) {
               echo "<img src='http://www.asiraj.com/project/images/$filename' height='75px' width='75px' /><br /><br />";
            } else {
               echo "Error: A problem occurred during file upload!";
            }
          } else {
             echo "Error: File ".$_FILES["uploaded_file"]["name"]." already exists";
          }
      } else {
         echo "Error: Only .jpg images are accepted for upload";
      }
    } else {
     echo "No file uploaded";
    }
    ?>
    <form id="form1" style="display:none" enctype="multipart/form-data" action="" method="post">
      <input type="hidden" name="MAX_FILE_SIZE" value="1000000" />
        Choose a file to upload: <input name="uploaded_file" type="file" /><br />
      <input name="submit" type="submit" value="Upload" /><br /><br />
    </form>

<br />
</div> 
<br />
<br />
<div class="scoretext animated flipInY">Score:</div>	
<div class="scorecontainer animated flipInX">
<div class="score animated wobble" id="score">0</div>
</div>
<br />
<div class="livesText animated flipInY">Lives:</div>
<div id="lives"></div>
<br />

<div class="outline">
	<div style = "display:none" id="resume"> <button>Resume Game</button></div>	
	<div class="container">
		<div class="content"></div>
		<div class="FinishScreen" style="display:none">
			<div class = "animated rubberBand"><h1>Game Over</h1></div>
			<div style = "display:none"  id="restart"> <button  >Restart</button></div>
			<div class = "animated tada"><h3 class = "ScoreReminder"></h3></div>
		</div>
	</div>
</div>
<h3><a href="CircuLearnMatch/index.html">Play Matching Game</a></h3>
<h3><a href="CircuLearnSimilarObjects/index.html">Play Related Image Game</a></h3>
<script type="text/javascript">
$(function(){
    $('select').change(function() {
        $('head').append('<link rel="stylesheet" href="stylesheets/' + $(this).val() + '.css" />') ;
        $('#object').text($('select').val());
    });
    $('#chk').on('change', function () {
        if ($('#chk:checked').length > 0) {
            $("#form1").show();
            $(".colorSelect").hide();
            $(".colorText").hide();
            $('body').append("<style>.selected{ background-image: url('http://www.asiraj.com/project/images/<?php echo $filename ?>');background-size:75px 75px;background-repeat:no-repeat; } </style> ");
              $('#object').text('<?php echo $filename ?>');
        } else {
            $('#object').text($('select').val());
            $("#form1").hide();
            $(".colorSelect").show();
            $(".colorText").show();
        }
    });
    if ($('#chk:checked').length > 0) {
            $("#form1").show();
            $(".colorSelect").hide();
            $(".colorText").hide();
            $('body').append("<style>.selected{ background-image: url('http://www.asiraj.com/project/images/<?php echo $filename ?>');background-size:75px 75px;background-repeat:no-repeat; } </style> ");
              $('#object').text('<?php echo $filename ?>');
    } else {
            $('#object').text($('select').val());
            $("#form1").hide();
            $(".colorSelect").show();
            $(".colorText").show();
    }
});
</script>
</body>
</html>