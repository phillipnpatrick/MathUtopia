var inputValueA = null;
var inputValueB = null;
var previousButton = null;

function initCalculatorDisplay(){
  var html = "";

  html += initCalculatorRowZero();
  html += initCalculatorRowOne();
  html += initCalculatorRowTwo();
  html += initCalculatorRowThree();
  html += initCalculatorRowFour();

  $('#calculator-body').append(html);

  $(".calculator-btn").on('click', function(){
    calculatorInputHandler(this.value, "up");
    this.blur();
  });

  $(document).on('keydown', function(e) {
    calculatorInputHandler(e.key, "down");
  });

  $(document).on('keyup', function(e) {
    calculatorInputHandler(e.key, "up");
  });
}

function calculatorInputHandler(value, event) {
  if (value.toLowerCase() === "clear" || value.toLowerCase() === "escape"){
    eventClear(value, event);
  } else if (value.toLowerCase() === "equals" || value.toLowerCase() === "enter") {
    eventEquals("equals", event);
  } else if (value.toLowerCase() === "negative") {
    eventNegative(value, event);
  } else if (value.toLowerCase() === "percent") {
    eventPercent(value, event);
  } else if (value.toLowerCase() === "backspace") {
    eventBackspace(value, event);
  } else {
    buttonEvent(value, event);
  }
}

function initCalculatorRowZero(){
  var html = "<div id='row-zero'>";
  html += addSpecialButton("Clear", "clear", "C");
  html += addSpecialButton("Negative", "negative", "&plus;/&minus;");
  html += addSpecialButton("Percent", "percent", "&percnt;");
  html += addFunctionButton("Divide", "/", "&div;");
  html += "</div>";

  return html;
}

function initCalculatorRowOne(){
  var html = "<div id='row-one'>";
  html += addNumberButton("7");
  html += addNumberButton("8");
  html += addNumberButton("9");
  html += addFunctionButton("Multiply", "*", "&times;");
  html += "</div>";

  return html;
}

function initCalculatorRowTwo(){
  var html = "<div id='row-two'>";
  html += addNumberButton("4");
  html += addNumberButton("5");
  html += addNumberButton("6");
  html += addFunctionButton("Subtract", "-", "&minus;");
  html += "</div>";

  return html;
}

function initCalculatorRowThree(){
  var html = "<div id='row-three'>";
  html += addNumberButton("1");
  html += addNumberButton("2");
  html += addNumberButton("3");
  html += addFunctionButton("Add", "+", "&plus;");
  html += "</div>";

  return html;
}

function initCalculatorRowFour(){
  var html = "<div id='row-three'>";
  html += addLongNumberButton("0");
  html += addNumberButton(".");
  html += addFunctionButton("Equal", "equals", "&equals;");
  html += "</div>";

  return html;
}

function addButton(divId, divClass, btnId, btnClass, value, symbol){
  var div = "<div id='" + divId + "' class='" + divClass + "'>";
  div += "<button id='" + btnId + "' class='" + btnClass + "' type='button' value='" + value + "'>" + symbol;
  div += "</button>";
  div += "</div>";

  return div;
}

function addLongNumberButton(number){
  return addButton("div" + number,
    "calculator-btn-wrapper calculator-btn-long",
    "btn" + number,
    "calculator-btn",
    number,
    number);
}

function addNumberButton(number){
  return addButton("div" + number,
    "calculator-btn-wrapper",
    "btn" + number,
    "calculator-btn",
    number,
    number);
}

function addSpecialButton(name, value, symbol){
  return addButton("div" + name,
    "calculator-btn-wrapper calculator-btn-special",
    "btn" + name,
    "calculator-btn calculator-btn-special",
    value,
    symbol);
}

function addFunctionButton(name, value, symbol){
  return addButton("div" + name,
    "calculator-btn-wrapper calculator-btn-function",
    "btn" + name,
    "calculator-btn calculator-btn-function",
    value,
    symbol);
}

function buttonEvent(value, event){
  if (isValidInputButton(value)){
      if (value >= 0 || value <= 9){
        toggleButton("#btn" + value, event);
      }
      else if (value == ".") {
        toggleButton("#btnDecimal", event);
      }

      if (event === "up"){
        if (previousButton === "operator" || previousButton === "equals"){
          $("#calculator-txt-screen").val("");
          previousButton = null;
        }

        var newValue = $("#calculator-txt-screen").val() + value;
        // console.log("newValue = " + newValue);
        $("#calculator-txt-screen").val(newValue);
      }
    }
  if (isValidOperationButton(value)){
    if (value == "/") {
      operationEvent(value, event, "#btnDivide");
    }
    else if (value == "*") {
      operationEvent(value, event, "#btnMultiply");
    }
    else if (value == "-") {
      operationEvent(value, event, "#btnSubtract");
    }
    else if (value == "+") {
      operationEvent(value, event, "#btnAdd");
    }
  }
}

function calculateResult() {
  var theCurrentOperator = currentOperator();
  var theResult = null;

  if (theCurrentOperator != null && inputValueA != null && inputValueB != null) {
    if (theCurrentOperator === "+") {
      theResult = eval(inputValueA + "+" + inputValueB);
    } else if (theCurrentOperator === "-") {
      theResult = eval(inputValueA + "-" + inputValueB);
    } else if (theCurrentOperator === "*") {
      theResult = eval(inputValueA + "*" + inputValueB);
    } else if (theCurrentOperator === "/") {
      theResult = eval(inputValueA + "/" + inputValueB);
    }
  }

  return theResult;
}

function currentOperator(){
  var currentOperation = null;
  var backgroundColor = "rgb(255, 255, 255)";
  var color = "rgb(255, 165, 0)";

  if ($("#btnDivide").css("background-color") === backgroundColor &&
      $("#btnDivide").css("color") === color){
        currentOperation = "/";
  } else if ($("#btnMultiply").css("background-color") === backgroundColor &&
      $("#btnMultiply").css("color") === color){
        currentOperation = "*";
  } else if ($("#btnSubtract").css("background-color") === backgroundColor &&
      $("#btnSubtract").css("color") === color){
        currentOperation = "-";
  } else if ($("#btnAdd").css("background-color") === backgroundColor &&
      $("#btnAdd").css("color") === color){
        currentOperation = "+";
  }

  return currentOperation;
}

function eventClear(value, event){
  toggleButton("#btnClear", event);
  if (event === "up") {
     $("#calculator-txt-screen").val("");
    inputValueA = null;
    inputValueB = null;
    previousButton = null;
    resetFunctions();
  }
}

function eventEquals(value, event){
  var newValue = null;

  if (value.toLowerCase() === "equals"){
    toggleButton("#btnEqual", event);
  }

  if (event === "up")
  {
    // store to inputValueB
    if (value.toLowerCase() === "equals"){
      updateInputVariables($("#calculator-txt-screen").val());
    }

    var calculation = calculateResult();
    if (calculation != null){
      // update the screen with the variables, reset
      $("#calculator-txt-screen").val(calculation);
      inputValueA = null;
      inputValueB = null;
      previousButton = "equals";
      resetFunctions();
    }
  }
}

function eventNegative(value, event){
  toggleButton("#btnNegative", event);

  if (event === "up"){
    if ($("#calculator-txt-screen").val() != "") {
      var newValue = eval($("#calculator-txt-screen").val() + "*-1");

      if ($("#calculator-txt-screen").val() == inputValueA) {
        inputValueA = newValue;
      } else if ($("#calculator-txt-screen").val() == inputValueB) {
        inputValueB = newValue;
      }

      $("#calculator-txt-screen").val(newValue);
    }
  }
}

function eventPercent(value, event){
  toggleButton("#btnPercent", event);

  if (event === "up"){
    if ($("#calculator-txt-screen").val() != "") {
      var newValue = eval($("#calculator-txt-screen").val() + "/100");

      if ($("#calculator-txt-screen").val() == inputValueA) {
        inputValueA = newValue;
      } else if ($("#calculator-txt-screen").val() == inputValueB) {
        inputValueB = newValue;
      }

      $("#calculator-txt-screen").val(newValue);
    }
  }
}

function eventBackspace(value, event){
  if (event === "up"){
    var screen = $("#calculator-txt-screen").val();

    screen = screen.substring(0, screen.length - 1);

    $("#calculator-txt-screen").val(screen);
  }
}

function isValidFunctionButton(value) {
  if (value == "clear" || value == "negative" || value == "percent" || value == "equals"){
    return true;
  }

  return false;
}

function isValidInputButton(value) {
  if (value >= 0 || value <= 9 || value == "."){
    return true;
  }

  return false;
}

function isValidOperationButton(value){
  if (value == "/" || value == "*" || value == "-" || value == "+"){
    return true;
  }

  return false;
}

function operationEvent(value, event, elementID) {
  if (event === "up"){
    previousButton = "operator";

    if (currentOperator() == null){
      toggleFunction(elementID, event);
    }

    updateInputVariables($("#calculator-txt-screen").val());

    var calculation = calculateResult();
    if (calculation != null) {
      updateInputVariables(calculation);
      $("#calculator-txt-screen").val(calculation);
      toggleFunction(elementID, event);
    }
  }
}

function resetFunctions() {
  $("#btnDivide").css("background-color", "orange");
  $("#btnDivide").css("color", "black");

  $("#btnMultiply").css("background-color", "orange");
  $("#btnMultiply").css("color", "black");

  $("#btnSubtract").css("background-color", "orange");
  $("#btnSubtract").css("color", "black");

  $("#btnAdd").css("background-color", "orange");
  $("#btnAdd").css("color", "black");
}

function toggleButton(elementID, event) {
  if (event === "down") {
    $(elementID).css("opacity", "0.1");
  } else if (event === "up") {
    $(elementID).css("opacity", "1");
  }
}

function toggleFunction(elementID, event){
  if (event === "up"){
    resetFunctions();

    $(elementID).css("background-color", "white");
    $(elementID).css("color", "orange");
  }
}

function updateInputVariables(value) {
  if (inputValueA != null && inputValueB != null){
    inputValueA = value;
    inputValueB = null;
  } else {
    if (inputValueA === null){
      inputValueA = value;
    }
    else if (inputValueB === null){
      inputValueB = value;
    }
  }
}
