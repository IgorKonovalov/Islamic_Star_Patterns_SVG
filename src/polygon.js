function Polygon(sides) {
  this.interiorAngle = ((sides - 2) * Math.PI) / sides;
  this.vertices = [];
  this.edges = [];

  this.addVertex = function(x, y) { // adding vertices
    let a = new Vector(x, y);
    let total = this.vertices.length;
    if (total > 0) {
      let prev = this.vertices[total - 1];
      let edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  this.close = function() { // closing figure
    let total = this.vertices.length;
    let last = this.vertices[total - 1];
    let first = this.vertices[0];
    let edge = new Edge(last, first);
    this.edges.push(edge);
  }

  this.getPolygonPoints = function() {
    let points = [];
    for (let i = 0; i < this.edges.length; i++) {
      points.push(this.edges[i].points);
    }
    return arrayToPoints(points);
  }

  this.getHankins = function() {
    let hankins = [];
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin(this.interiorAngle);
      let h1 = this.edges[i].h1;
      let h2 = this.edges[i].h2;
      hankins.push(h1.a.x);
      hankins.push(h1.a.y);
      hankins.push(h1.end.x);
      hankins.push(h1.end.y);
      hankins.push(h2.a.x);
      hankins.push(h2.a.y);
      hankins.push(h2.end.x);
      hankins.push(h2.end.y);
    }
    return hankins;
  }
}
