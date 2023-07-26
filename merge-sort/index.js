function merge(left, right) {
  const sorted = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftItem = left[leftIndex];
    const rightItem = right[rightIndex];

    if (leftItem < rightItem) {
      sorted.push(leftItem);
      leftIndex++;
    } else {
      sorted.push(rightItem);
      rightIndex++;
    }
  }

  return [...sorted, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}


function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);

  const sortedLeft = mergeSort(arr.slice(0, mid));
  const sortedRight = mergeSort(arr.slice(mid));

  return merge(sortedLeft, sortedRight);
}