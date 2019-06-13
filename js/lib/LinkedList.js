class LinkedList {
  constructor {
    this.head = null;
    this.size = 0;
  }

  add(element){
    // new node
    var node = new Node(element);

    // store current node
    var current;

    // if list is empty, set head to new node
    if (this.head == null){
      this.head = node;
    }
    else {
      current = this.head;

      // find the end of the list
      while (current.next) {
        current = current.next;
      }

      // add node to the end
      current.next = node;
    }

    this.size++;
  }

  insertAt(element, index){
    if (index > 0 && index > this.size){
      return false;
    }
    else {
      // create a new Node
      var node = new Node(element);
      var current, previous;

      current = this.head;

      // add element as the head
      if (index == 0){
        node.next = head;
        this.head = node;
      }
      else {
        var iterator = 0;

        // find the position to insert
        while (iterator < index){
          iterator++;
          previous = current;
          current = current.next;
        }

        // add the element
        node.next = current;
        previous.next = node;
      }
      this.size++;
    }
  }

  removeFrom(index){
    if (index > 0 && index > this.size){
      return -1;
    }
    else {
      var current, previous;
      var iterator = 0;
      current = this.head;
      previous = current;

      // delete head
      if (index === 0){
        this.head = current.next;
      }
      else {
        // find the node to remove
        while (iterator < index){
          iterator++;
          previous = current;
          current = current.next;
        }

        // remove element
        previous.next = current.next;
      }
      this.size--;

      // return the removed element
      return current.element;
    }
  }

  removeElement(element){
    var current = this.head;
    var previous = null;

    while (current != null){
      if (current.element === element){
        if (previous == null){
          this.head = current.next;
        }
        else {
          previous.next = current.next;
        }
        this.size--;
        return current.element;
      }
      previous = current;
      current = current.next;
    }
    return -1;
  }

  indexOf(element){
    var count = 0;
    var current = this.head;

    while (current != null){
      if (current.element === eleemnt){
        return count;
      }

      count++;
      current = current.next;
    }

    // not found
    return -1;
  }

  isEmpty(){
    return this.size == 0;
  }

  sizeOfList(){
    return this.size;
  }

  printList(){
    var current = this.head;
    var string = "";
    while (current){
      string += current.element + " ";
      current = current.next;
    }
    return string;
  }
}
