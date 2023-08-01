import Node from './node.js';

const Tree = (array) => {
  let root = null;
  let sortedUniqueArray = [];

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const buildTree = (array, start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  };

  sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);

  root = buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(1)
  const insert = (value) => {
    const newNode = Node(value);

    if (root === null) {
      root = newNode;
      return;
    }

    let current = root;
    let parent = null;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      parent = current;
      if (value === current.data) {
        break;
      } else if (value < current.data) {
        current = current.left;

        if (current === null) {
          parent.left = newNode;
          break;
        }
      } else {
        current = current.right;

        if (current === null) {
          parent.right = newNode;
          break;
        }
      }
    }
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(h) where h is the height of the tree
  const insertNode = (node, value) => {
    if (node === null) {
      node = Node(value);
    } else if (value < node.data) {
      node.left = insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = insertNode(node.right, value);
    }

    return node;
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(h) where h is the height of the tree
  const insertRec = (value) => {
    insertNode(root, value);
  };

  // Time complexity: O(n)
  // Space complexity: O(1)
  const findMinNode = (node) => {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(h) where h is the height of the tree
  const removeNode = (node, value) => {
    if (node === null) {
      return null;
    } else if (value < node.data) {
      node.left = removeNode(node.left, value);
    } else if (value > node.data) {
      node.right = removeNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null) {
        node = node.right;
      } else if (node.right === null) {
        node = node.left;
      } else {
        let temp = findMinNode(node.right);
        node.data = temp.data;
        node.right = removeNode(node.right, temp.data);
      }
    }

    return node;
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(h) where h is the height of the tree
  const removeRec = (value) => {
    removeNode(root, value);
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(1)
  const getSuccessor = (node) => {
    let successor = node.right;
    let successorParent = node;

    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    if (successor !== node.right) {
      successorParent.left = successor.right;
      successor.right = node.right;
    }

    return successor;
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(1)
  const remove = (value) => {
    let current = root;
    let parent = null;
    let isLeftChild = true;

    if (current === null) {
      return;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (value === current.data) {
        break;
      } else if (value < current.data) {
        parent = current;
        isLeftChild = true;
        current = current.left;
      } else {
        parent = current;
        isLeftChild = false;
        current = current.right;
      }

      if (current === null) {
        return;
      }
    }

    if (current.left === null && current.right === null) {
      if (current === root) {
        root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (current.left === null) {
      if (current === root) {
        root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else if (current.right === null) {
      if (current === root) {
        root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else {
      let successor = getSuccessor(current);
      if (current === root) {
        root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      successor.left = current.left;
    }
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(1)
  const find = (value) => {
    let current = root;

    while (current !== null) {
      if (value === current.data) {
        return current;
      } else if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const height = (node = root) => {
    if (node === null) {
      return -1;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  // Time complexity: O(h) where h is the height of the tree
  // Space complexity: O(1)
  const depth = (node = root) => {
    if (node === null) {
      return -1;
    }

    let current = root;
    let depth = 0;

    while (current !== null) {
      if (node.data === current.data) {
        break;
      } else if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      depth++;
    }

    return depth;
  };

  // Time complexity: O(n)
  // Space complexity: O(n/2) which is O(n)
  const levelOrder = (fn) => {
    if (root === null) {
      if (typeof fn !== 'function') {
        return [];
      } else {
        return;
      }
    }

    let array = [];
    const queue = [];
    let current = root;

    queue.push(current);

    while (queue.length > 0) {
      current = queue.shift();
      if (typeof fn === 'function') {
        fn(current);
      } else {
        array.push(current.data);
      }

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    if (typeof fn !== 'function') {
      return array;
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const levelOrderRecHelper = (node, level, fn) => {
    if (node === null) {
      return;
    }

    if (level === 0) {
      fn(node);
    } else if (level > 0) {
      levelOrderRecHelper(node.left, level - 1, fn);
      levelOrderRecHelper(node.right, level - 1, fn);
    }
  };

  // Time complexity: O(h * n) where h is the height of the tree
  // Space complexity: O(h) where h is the height of the tree
  const levelOrderRec = (fn) => {
    if (root === null) {
      if (typeof fn !== 'function') {
        return [];
      }
      return;
    }

    let treeHeight = height(root);
    for (let i = 0; i <= treeHeight; i++) {
      levelOrderRecHelper(root, i, fn);
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const inOrderRec = (fn) => {
    const array = [];

    const traverse = (node) => {
      if (node === null) {
        return;
      }

      traverse(node.left);

      if (typeof fn === 'function') {
        fn(node);
      } else {
        array.push(node.data);
      }

      traverse(node.right);
    };

    traverse(root);

    if (typeof fn !== 'function') {
      return array;
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const inOrder = (fn) => {
    if (root === null) {
      if (typeof fn !== 'function') {
        return [];
      }
      return;
    }

    const array = [];
    const stack = [];
    let current = root;

    stack.push(current);

    while (stack.length > 0) {
      while (current.left !== null) {
        current = current.left;
        stack.push(current);
      }

      current = stack.pop();
      if (typeof fn === 'function') {
        fn(current);
      } else {
        array.push(current.data);
      }

      if (current.right !== null) {
        current = current.right;
        stack.push(current);
      }
    }

    if (typeof fn !== 'function') {
      return array;
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const preOrderRec = (fn) => {
    const array = [];

    const traverse = (node) => {
      if (node === null) {
        return;
      }

      if (typeof fn === 'function') {
        fn(node);
      } else {
        array.push(node.data);
      }

      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);

    if (typeof fn !== 'function') {
      return array;
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const preOrder = (fn) => {
    if (root === null) {
      if (typeof fn !== 'function') {
        return [];
      }
      return;
    }

    const array = [];
    const stack = [];
    let current = root;

    stack.push(current);

    while (stack.length > 0) {
      current = stack.pop();
      if (typeof fn === 'function') {
        fn(current);
      } else {
        array.push(current.data);
      }

      if (current.right !== null) {
        stack.push(current.right);
      }

      if (current.left !== null) {
        stack.push(current.left);
      }
    }

    if (typeof fn !== 'function') {
      return array;
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const postOrderRec = (fn) => {
    const array = [];

    const traverse = (node) => {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);

      if (typeof fn === 'function') {
        fn(node);
      } else {
        array.push(node.data);
      }
    };

    traverse(root);

    if (typeof fn !== 'function') {
      return array;
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const postOrder = (fn) => {
    if (root === null) {
      if (typeof fn !== 'function') {
        return [];
      }
      return;
    }

    const array = [];
    const stack = [];
    const output = [];
    let current = root;

    stack.push(current);

    while (stack.length > 0) {
      current = stack.pop();
      output.push(current);

      if (current.left !== null) {
        stack.push(current.left);
      }

      if (current.right !== null) {
        stack.push(current.right);
      }
    }

    while (output.length > 0) {
      current = output.pop();
      if (typeof fn === 'function') {
        fn(current);
      } else {
        array.push(current.data);
      }
    }

    if (typeof fn !== 'function') {
      return array;
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const isBalanced = () => { 
    let flag = true;

    const helper = (node) => { 
      if (node === null) {
        return 0;
      }

      const leftHeight = helper(node.left);
      const rightHeight = helper(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        flag = false;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    helper(root);

    return flag;
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const rebalance = () => { 
    sortedUniqueArray = inOrder();
    root = buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);

    return root;
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  // Time complexity: O(n)
  // Space complexity: O(h) where h is the height of the tree
  const print = () => {
    prettyPrint(root);
  };

  return {
    getRoot: () => root,
    insert,
    insertRec,
    remove,
    removeRec,
    find,
    height,
    depth,
    levelOrder,
    levelOrderRec,
    inOrder,
    inOrderRec,
    preOrder,
    preOrderRec,
    postOrder,
    postOrderRec,
    isBalanced,
    rebalance,
    print,
  };
};

export default Tree;
