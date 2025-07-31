// QuickSort implementation
export function quickSort(arr, key) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [], right = [];

  const pivotVal = parseFloat(pivot[key]) || 0;

  for (let i = 0; i < arr.length - 1; i++) {
    const currentVal = parseFloat(arr[i][key]) || 0;
    if (currentVal >= pivotVal) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left, key), pivot, ...quickSort(right, key)];
}

// MergeSort implementation
export function mergeSort(arr, key) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key);
  const right = mergeSort(arr.slice(mid), key);

  return merge(left, right, key);
}

function merge(left, right, key) {
  const result = [];

  while (left.length && right.length) {
    const leftVal = parseFloat(left[0][key]) || 0;
    const rightVal = parseFloat(right[0][key]) || 0;

    if (leftVal >= rightVal) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return [...result, ...left, ...right];
}
