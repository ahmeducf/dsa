import Node from './node.js'

const LinkedList = () => {
  let list = null;

  // Time Complexity: O(n)
  const append = (value) => {
    const node = Node(value);

    if (list === null) {
      list = node;
    } else {
      let tmp = list;

      while (tmp.getNext()) {
        tmp = tmp.getNext();
      }

      tmp.setNext(node);
    }
  };

  // Time complexity = O(1)
  const prepend = (value) => {
    const node = Node(value);

    if (list === null) {
      list = node;
    } else {
      node.setNext(list);
      list = node;
    }
  };

  // Time Complexity: O(n)
  const insertAt = (value, index) => {
    if (list === null) {
      throw Error('List is empty');
    }

    let prev = null;
    let cur = list;

    while (cur && index) {
      index -= 1;

      prev = cur;
      cur = cur.getNext();
    }

    const node = Node(value);

    if (prev === null) {
      node.setNext(list);
      list = node;
    } else {
      node.setNext(cur);
      prev.setNext(node);
    }
  };

  // Time Complexity: O(n)
  const size = () => {
    if (list === null) return 0;

    let tmp = list;
    let count = 1;

    while (tmp.getNext()) {
      count += 1;
      tmp = tmp.getNext();
    }

    return count;
  };

  // Time Complexity: O(1)
  const head = () => list;

  // Time Complexity: O(n)
  const tail = () => {
    let tmp = list;

    while (tmp.getNext()) {
      tmp = tmp.getNext();
    }

    return tmp;
  };

  // Time Complexity: O(n)
  const at = (index) => {
    let tmp = list;

    while (tmp && index) {
      tmp = tmp.getNext();
      index -= 1;
    }

    if ((!tmp && index) || (!tmp && !index)) {
      throw Error('List upper bound exceeded');
    }

    return tmp;
  };

  // Time Complexity: O(n)
  const pop = () => {
    if (list === null) {
      throw Error('List is empty');
    }

    let prev = null;
    let cur = list;

    while (cur.getNext()) {
      prev = cur;
      cur = cur.getNext();
    }

    if (prev === null) {
      list = null;
    } else {
      prev.setNext(null);
    }
  };

  // Time Complexity: O(n)
  const removeAt = (index) => {
    if (list === null) {
      throw Error('List is empty');
    }

    let prev = null;
    let cur = list;

    while (cur && index) {
      index -= 1;

      prev = cur;
      cur = cur.getNext();
    }

    if ((!cur && !index) || (!cur && index)) {
      throw Error('List upper bound exceeded');
    }

    if (prev === null) {
      list = list.getNext();
    } else {
      prev.setNext(cur.getNext());
      cur.setNext(null);
    }
  };

  // Time Complexity: O(n)
  const contains = (value) => {
    let tmp = list;

    while (tmp) {
      if (tmp.getValue() === value) {
        return true;
      }

      tmp = tmp.getNext();
    }

    return false;
  };

  // Time Complexity: o(n)
  const find = (value) => {
    let tmp = list;
    let index = 0;

    while (tmp) {
      if (tmp.getValue() === value) {
        return index;
      }

      tmp = tmp.getNext();
      index += 1;
    }

    return null;
  };

  // Time Complexity: O(n)
  const toString = () => {
    let string = '';
    let tmp = list;

    while (tmp) {
      string = string.concat(`( ${tmp.getValue()} ) -> `);

      tmp = tmp.getNext();
    }

    string = string.concat('null');

    return string;
  };

  return {
    append,
    prepend,
    insertAt,
    size,
    head,
    tail,
    at,
    pop,
    removeAt,
    contains,
    find,
    toString,
  };
};

export default LinkedList;
