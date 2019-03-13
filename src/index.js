import { DoublyLinkedCircularList } from './List';

const dblLinkList = new DoublyLinkedCircularList(10);
dblLinkList.add({
  name: 'Abhisek'
});
dblLinkList.add([1, 2]);
dblLinkList.add('Hello');

console.log(dblLinkList);

console.log('Values', dblLinkList.toString())
