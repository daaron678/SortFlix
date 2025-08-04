// quick sort
export function quickSort(arr, key, withTiming = false) {
  const start = performance.now();
  
  if (arr.length <= 1) return withTiming ? { result: arr, time: 0 } : arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  const pivotVal = key === 'combined' ? pivot.combinedScore : parseFloat(pivot[key]);
  const pivotNum = isNaN(pivotVal) ? -Infinity : pivotVal;

  for (let i = 0; i < arr.length - 1; i++) {
    const currentVal = key === 'combined' ? arr[i].combinedScore : parseFloat(arr[i][key]);
    const currentNum = isNaN(currentVal) ? -Infinity : currentVal;

    if (currentNum >= pivotNum) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  const sortedLeft = quickSort(left, key, withTiming);
  const sortedRight = quickSort(right, key, withTiming);
  
  const result = [
    ...(withTiming ? sortedLeft.result : sortedLeft),
    pivot,
    ...(withTiming ? sortedRight.result : sortedRight)
  ];

  if (withTiming) {
    const time = performance.now() - start + sortedLeft.time + sortedRight.time;
    return { result, time };
  }
  
  return result;
}

// merge sort
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
    const leftVal = key === 'combined' ? left[0].combinedScore : parseFloat(left[0][key]);
    const rightVal = key === 'combined' ? right[0].combinedScore : parseFloat(right[0][key]);
    const leftNum = isNaN(leftVal) ? -Infinity : leftVal;
    const rightNum = isNaN(rightVal) ? -Infinity : rightVal;

    if (leftNum >= rightNum) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return [...result, ...left, ...right]; 
}
