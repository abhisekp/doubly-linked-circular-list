import debug from './debug';
import { Node, checkNode } from './Node';
import decorator from './decorator'

const dList = debug('DLCList');
const dListAdd = dList.extend('add');

@decorator
export class DoublyLinkedCircularList {
  head?: Node = null;

  constructor(...values) {
    values.forEach(::this.add)
  }

  @decorator
  add(value) {
    return this.insert(value)
  }

  /**
   * Insert a value to the list.
   *
   * Current: [ C<-A->B | A<-*B->C | B<-C->A ]
   * Expected: [ C<-A->B | A<-B->D | B<-*D->C | D<-C->A ]
   *
   * @param {*} value The value to insert into the list
   * @param {number} [index] The index at which to insert the value
   * @returns {DoublyLinkedCircularList}
   * @memberof DoublyLinkedCircularList
   */
  insert(value, index?: number): DoublyLinkedCircularList {
    dListAdd('Adding a node...');
    dListAdd('Existing Head: %O', this.head);

    // Create a new node to insert
    const currInsNode = new Node(value);
    dListAdd('[ D ]: %O', currInsNode);

    const formerHead = this.head;
    dListAdd('[ B ]: %O', formerHead);

    /** If a node exists at the HEAD,
     * then check if it has a NEXT node,
     * if it has, then set the HEAD node's
     * next value and NEXT node's previous value
     * as CURRENT node.
     * */
    if (formerHead) {
      // [ B ]
      const headNextNode = formerHead?.getNext();
      dListAdd('[ B ]: %O', headNextNode);

      // [ A ]
      const headPrevNode = formerHead?.getPrevious();
      dListAdd('[ A ]: %O', headPrevNode);

      // assign CURRENT node as the previous node
      // of the NEXT node
      headNextNode?.setPrevious(currInsNode);
      dListAdd('\nAssign CURRENT node as previous node of the NEXT node')
      dListAdd('[ C<-A->B | A<-*B->C | D<-C->A ]')
      dListAdd('HEAD next: %O', headNextNode);

      if (!headPrevNode) {
        // Assign CURRENT node to HEAD node's previous
        formerHead ?.setPrevious(currInsNode);
        dListAdd(`Assign CURRENT node to HEAD node's previous`)
      }

      // assign CURRENT node as the next node
      // of the PREVIOUS node
      // [ C<-A->D | A<-*B->C | D<-C->A ]
      headPrevNode?.setNext(currInsNode);

      // Assign the CURRENT node's previous to the HEAD
      currInsNode?.setPrevious(formerHead);
      dListAdd('\nAssigned CURRENT node previous to HEAD')
      dListAdd('[ C<-A->B | A<-*B->C | B<-D | D<-C->A ]')
      dListAdd('CURRENT: %O', currInsNode);

      // Assign the CURRENT node's next to the HEAD's next node
      currInsNode?.setNext(headNextNode || formerHead);
      dListAdd(`\nAssign CURRENT node's next to Former HEAD's next node`)
      dListAdd('[ C<-A->B | A<-*B->C | B<-D->C | D<-C->A ]')
      dListAdd('CURRENT: %O', currInsNode);

      // Set HEAD node's next to CURRENT node
      formerHead?.setNext(currInsNode);
      dListAdd(`\nAssign HEAD node's next to CURRENT node`)
      dListAdd('[ C<-A->B | A<-*B->D | B<-D->C | D<-C->A ]')
      dListAdd('HEAD: %O', formerHead);

    }

    // Make the CURRENT node as the HEAD
    this.head = currInsNode;
    dListAdd('[ C<-A->B | A<-B->D | B<-*D->C | D<-C->A ]')
    dListAdd('New Head: %O', this.head);
    dListAdd('Added a node.');

    return this;
  }

  toValue() {
    const currHead = this.head;
    const list:Array<any> = []

    let cursor = currHead;

    do {
      list.push(cursor?.getValue());
      cursor = cursor?.getNext()
    } while (cursor !== null && cursor !== currHead)

    return list;
  }

  toJSON(replacer = null, indent) {
    return JSON.stringify(this.toValue(), replacer, indent);
  }

  toString() {
    return this.toJSON(null, 2);
  }

  next() {}
}
