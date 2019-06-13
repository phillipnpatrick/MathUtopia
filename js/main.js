$(document).ready(function(){
  // console.log("ready");
  var draggableCalculator = document.getElementById("calculator");
  if (draggableCalculator != null){
    dragElement(document.getElementById("calculator"));
    initCalculatorDisplay();
  }

	$('.minimize').on('click', function(){minimize('minimized');});
	$('.maximize').on('click', function(){maximize('minimized');});

  $('.calc-minimize').on('click', function(){minimizeCalculator('#calculator', 'calc-minimized');});
	$('.calc-maximize').on('click', function(){maximizeCalculator('#calculator', 'calc-minimized');});
});
