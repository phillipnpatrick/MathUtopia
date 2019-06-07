// var calculatorLocation = "";

function minimize(minimizeClass){
	$('body').addClass(minimizeClass);
}

function minimizeCalculator(elementID, minimizeClass){
  $(elementID).removeAttr('style');
	minimize(minimizeClass);
  $('.calc-minimize').hide();
}

function maximize(minimizeClass){
	$('body').removeClass(minimizeClass);
}

function maximizeCalculator(elementID, minimizeClass){
  $('.calc-minimize').show();
  maximize(minimizeClass);
  var position = $(elementID).position();
  console.log(position);
  if (position.top == 0){
    $(elementID).css('top',"25%");
  }
  if (position.left == 0){
    $(elementID).css('left',"50%");
  }
}
