// ================= LINEAR SEARCH =================
function linearSearch(input) {

  const { array, target } = input;
  let states = [];

  for (let i = 0; i < array.length; i++) {

    states.push({
      array: [...array],
      current: i,
      found: array[i] === target
    });

    if (array[i] === target) break;
  }

  return states;
}


// ================= BINARY SEARCH =================
function binarySearch(input) {

  const { array, target } = input;
  let states = [];

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {

    let mid = Math.floor((left + right) / 2);

    states.push({
      array: [...array],
      left,
      right,
      mid,
      found: array[mid] === target
    });

    if (array[mid] === target) break;

    if (array[mid] < target)
      left = mid + 1;
    else
      right = mid - 1;
  }

  return states;
}


// ================= JUMP SEARCH =================
function jumpSearch(input) {

  const { array, target } = input;
  let states = [];

  const n = array.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;

  while (array[Math.min(step, n) - 1] < target) {

    states.push({
      array: [...array],
      current: Math.min(step, n) - 1
    });

    prev = step;

    if (prev >= n) return states;
  }

  for (let i = prev; i < Math.min(step, n); i++) {

    states.push({
      array: [...array],
      current: i,
      found: array[i] === target
    });

    if (array[i] === target) break;
  }

  return states;
}

module.exports = {
  linearSearch,
  binarySearch,
  jumpSearch
};