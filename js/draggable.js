//Make the DIV element draggagle:
// dragElement(document.getElementById("calculator"));

function dragElement(element) {
  var newX = 0, newY = 0, originalX = 0, originalY = 0;

  if (document.getElementById(element.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(element.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    // get the mouse cursor position at startup:
    originalX = e.clientX;
    originalY = e.clientY;

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    newX = originalX - e.clientX;
    newY = originalY - e.clientY;
    originalX = e.clientX;
    originalY = e.clientY;
    // set the element's new position:
    element.style.top = (element.offsetTop - newY) + "px";
    element.style.left = (element.offsetLeft - newX) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
