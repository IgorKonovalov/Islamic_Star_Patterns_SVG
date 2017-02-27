function arrayToPoints(array) {
  let points = [];
  for (let name in array) {
    points.push(array[name].x);
    points.push(' ');
    points.push(array[name].y);
    points.push(' ');
  }
  return points.join('');
}
