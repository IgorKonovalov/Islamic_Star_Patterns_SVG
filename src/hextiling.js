
function HexagonalTiling(r) {
  this.polys = [];

  this.buildCell = function(x, y) {
    let p = new Polygon(6);
    for (let i = 0; i < 6; i++) {
      let point = {};
      let angle_deg = 60 * i;
      let angle_rad = Math.PI / 180 * angle_deg;
      point.x = x + r * Math.cos(angle_rad);
      point.y = y + r * Math.sin(angle_rad);
      p.addVertex(point.x, point.y);
    }
    p.close();
    this.polys.push(p);
  }

  this.buildGrid = function() {
    let h = r * 2;
    let w = (Math.sqrt(3) / 2) * h;
    let inc = 3 * (h / 4);
    let row = 0;
    for (let x = -h / 2; x < 700 + h/2; x += inc) {
      let startY = ((row % 2) == 0) ? -w : -w / 2;
      for (let y = startY; y < 540; y += w) {
        this.buildCell(x, y);
      }
      row++;
    }
  }
}
