import Tree from './index.js';

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomArray = (length, min, max) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(generateRandomNumber(min, max));
  }
  return arr;
};

const arr = generateRandomArray(10, 0, 100);

const tree = Tree(arr);
tree.print();

console.log(`Tree is balanced: ${tree.isBalanced()}`);

console.log('Level order traversal');
console.log(tree.levelOrder());

console.log('Pre order traversal');
console.log(tree.preOrder());

console.log('In order traversal');
console.log(tree.inOrder());

console.log('Post order traversal');
console.log(tree.postOrder());

console.log('Unbalce the tree');
tree.insert(101);
tree.insert(102);
tree.insert(103);

console.log(`Tree is balanced: ${tree.isBalanced()}`);

console.log('rebalance the tree');
tree.rebalance();

console.log(`Tree is balanced: ${tree.isBalanced()}`);

console.log('Level order traversal');
console.log(tree.levelOrder());

console.log('Pre order traversal');
console.log(tree.preOrder());

console.log('In order traversal');
console.log(tree.inOrder());

console.log('Post order traversal');
console.log(tree.postOrder());
