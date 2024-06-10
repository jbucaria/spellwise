const binarySearch = (arr, value) => {
  let left = 0
  let right = arr.length - 1
  let middle = Math.floor(left + right) / 2
  while (arr[middle] !== value && left <= right) {
    if (value < arr[middle]) right = middle - 1
    else left = middle + 1

    middle = Math.floor(left + right) / 2
  }
  return arr[middle] === value ? middle : -1
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

console.log(binarySearch(array, 17))
