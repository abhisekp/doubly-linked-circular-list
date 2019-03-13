/* eslint-disable no-underscore-dangle */
export function checkNode(node: Node | null) {
  // eslint-disable-next-line no-use-before-define
  if (node !== null && !(node instanceof Node)) {
    throw new Error('node must be of type Node');
  }

  return true;
}

export class Node {
  #_next = null;
  #_previous = null;
  #_value

  constructor(value) {
    this._value = value;
  }

  setNext(node: Node | null): Node {
    checkNode(node);

    this._next = node;
    return this;
  }

  setPrevious(node: Node | null): Node {
    checkNode(node);

    this._previous = node;
    return this;
  }

  getNext(): Node {
    return this._next;
  }

  getPrevious(): Node {
    return this._previous;
  }

  valueOf() {
    return this.getValue();
  }

  getValue() {
    return this._value;
  }
}
