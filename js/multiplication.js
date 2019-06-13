const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const PAUSE_DRAW_TIME = 500;

$(document).ready(function(){
    var a = new Multiplicand(31, slopeType.POSITIVE);
    var b = new Multiplicand(33, slopeType.NEGATIVE);

    drawSticks(a);
    // sleep(a.pauseTime()).then(() => {
      drawSticks(b);
    // })

    // sleep(b.pauseTime()+2000).then(() => {
      // draw intersections
      var i = new Intersection(NORTH_TOP, NORTH_LEFT, directionType.NORTH);
      $('#japanese-multiplication').append(i.getHtml());
    // })

    function drawSticks(item){
      for (var j = 0; j < item.getStickCount(); j++){
        (function (j) {
          setTimeout(function () {
            $('#japanese-multiplication').append(item.drawNextStick());
          }, PAUSE_DRAW_TIME*j);
        })(j);
      }
    }

    function getPosition(elementId) {
      return document.getElementById(elementId).getBoundingClientRect();
    }
});

function myFunction(){
  var div = document.getElementById("positive-stick-1");
  console.log("div = " + div);
  var rect = div.getBoundingClientRect();
  x = rect.left;
  y = rect.top;
  w = rect.width;
  h = rect.height;
  console.log(rect);
}

const CSS_STICK = "stick";
const CSS_STICK_NEGATIVE_SLOPE = "stick-negative-slope";
const CSS_STICK_POSITIVE_SLOPE = "stick-positive-slope";
const CSS_STICK_INTERSECTION = "stick-intersection";

const DEFAULT_NEGATIVE_TOP = 158;
const DEFAULT_NEGATIVE_LEFT = 118;
const DEFAULT_POSITIVE_TOP = 158;
const DEFAULT_POSITIVE_LEFT = -34;
const DEFAULT_STICK_OFFSET = 20;
const DEFAULT_TWO_DIGIT_TOP_OFFSET = 170;
const DEFAULT_TWO_DIGIT_LEFT_OFFSET = 160;
const DEFAULT_TWO_DIGIT_NEGATIVE_LEFT_OFFSET = 118;
const NORTH_TOP = 80;
const NORTH_LEFT = 238.5;
const SOUTH_TOP = 410;
const SOUTH_LEFT = 238.5;
const WEST_TOP = 243;
const WEST_LEFT = 74;
const EAST_TOP = 243;
const EAST_LEFT = 403;

const slopeType = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative'
}

const directionType = {
  NORTH: 'north',
  EAST: 'east',
  WEST: 'west',
  SOUTH: 'south'
}

class Multiplicand{
  constructor(value, slope){
    this.value = value;
    this.slope = slope;
    this.digitIndex = 0;
    this.stickIndex = 0;

    this.digits = [];
    for (var i = 0; i < this.value.toString().length; i++){
      this.digits.push(this.value.toString()[i]);
    }

    this.sticks = [];
    if (this.slope === slopeType.POSITIVE){
      this.setPositiveSticks();
    }
    else if (this.slope === slopeType.NEGATIVE){
      this.setNegativeSticks();
    }
  }

  drawNextStick(){
    // console.log("drawNext: this.stickIndex = " + this.stickIndex + "; this.sticks.length = " + this.sticks.length);
    if (this.stickIndex > this.sticks.length){
      return "";
    }
    var html = this.sticks[this.stickIndex].getHtml();
    this.stickIndex++;
    return html;
  }

  getDigitCount(){
    return this.value.toString().length;
  }

  getStickCount(){
    return this.sticks.length;
  }

  getStickDivId(index){
    return this.sticks[index].id;
  }

  pauseTime(){
    return this.sticks.length * PAUSE_DRAW_TIME;
  }

  setPositiveSticks(){
    // console.log("setPositiveSticks");
    var index = 1;
    for (var digit = 0; digit < this.digits.length; digit++){
      // console.log("setPositiveSticks: value = " + this.digits[digit]);
      for (var k = 0; k < this.digits[digit]; k++){
        // console.log("setPositiveSticks: k = " + k);
        var top = DEFAULT_POSITIVE_TOP;
        var left = DEFAULT_POSITIVE_LEFT + (k * DEFAULT_STICK_OFFSET);
        if (digit == 1){
          top = DEFAULT_POSITIVE_TOP + DEFAULT_TWO_DIGIT_TOP_OFFSET;
          left =  DEFAULT_POSITIVE_LEFT + DEFAULT_TWO_DIGIT_LEFT_OFFSET + (k * DEFAULT_STICK_OFFSET);
        }
        this.sticks.push(new JapaneseMultiplicationStick(top, left, this.slope, index++));
      }
      // console.log("setPositiveSticks: this.sticks.length = " + this.sticks.length);
    }
  }

  setNegativeSticks(){
    // console.log("setNegativeSticks");
    var index = 1;
    for (var digit = 0; digit < this.digits.length; digit++){
      // console.log("setNegativeSticks: value = " + this.digits[digit]);
      for (var k = 0; k < this.digits[digit]; k++){
        // console.log("setNegativeSticks: k = " + k);
        var top = DEFAULT_NEGATIVE_TOP;
        var left = DEFAULT_NEGATIVE_LEFT - (k * DEFAULT_STICK_OFFSET);
        if (digit == 1){
          top = DEFAULT_NEGATIVE_TOP + DEFAULT_TWO_DIGIT_TOP_OFFSET;
          left =  DEFAULT_NEGATIVE_LEFT - DEFAULT_TWO_DIGIT_NEGATIVE_LEFT_OFFSET - (k * DEFAULT_STICK_OFFSET);
        }
        this.sticks.push(new JapaneseMultiplicationStick(top, left, this.slope, index++));
      }
      // console.log("setNegativeSticks: this.sticks.length = " + this.sticks.length);
    }
  }
}

class JapaneseMultiplicationStick{
  constructor(top, left, slope, index){
    this.top = top;
    this.left = left;
    this.slope = slope;
    this.id = slope + "-stick-" + index;
  }

  getCss(){
    var css = "class = '" + CSS_STICK;

    if (this.slope == slopeType.POSITIVE){
      css += " " + CSS_STICK_POSITIVE_SLOPE;
    }
    else if (this.slope == slopeType.NEGATIVE){
      css += " " + CSS_STICK_NEGATIVE_SLOPE;
    }

    css += "'";

    return css;
  }

  getStyle(){
    var style = "style='";

    style += "top: " + this.top + "px; ";
    style += "left: " + this.left + "px;";

    style += "'";

    return style;
  }

  getHtml(){
    return "<div id='" + this.id + "' " + this.getCss() + " " + this.getStyle() + "></div>";
  }
}

class Intersection{
  constructor(top, left, direction){
    this.top = top;
    this.left = left;
    this.direction = direction;
  }

  getHtml(){
    return "<div class='" + CSS_STICK_INTERSECTION + "' " + this.getStyle() + "></div>";
  }

  getStyle(){
    var style = "style='";

    style += "top: " + this.top + "px; ";
    style += "left: " + this.left + "px;";

    style += "'";

    return style;
  }
}
