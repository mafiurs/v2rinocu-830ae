function getOptimalCombination(array, value, limit) {
  var checkLength = function (array) {
    return array.length === limit;
  };
  var combinations = combine(array);
  combinations = limit ? combinations.filter(checkLength) : combinations;
  var sum = combinations.map(function (c) {
    return c.reduce(function (p, c) {
      return p + c;
    }, 0);
  });
  var sumSorted = sum.slice(0).sort(function (a, b) {
    return a - b;
  });

  let index = locationOf(value, sumSorted);
  index = index >= sum.length ? sum.length - 1 : index;
  index = sum.indexOf(sumSorted[index]);

  return combinations[index];
}

function combine(a) {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = 0; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

function locationOf(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (end - start <= 1 || array[pivot] === element) return pivot;
  if (array[pivot] < element) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

export default getOptimalCombination;
