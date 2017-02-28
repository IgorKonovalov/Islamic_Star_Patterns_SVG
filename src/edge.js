function Edge(a, b) { // side of the polygon
  this.a = a;
  this.b = b;
  this.h1; // hankin objects - vectors for middle points
  this.h2;
  this.points = this.a;
  this.length = Math.sqrt(Math.pow((this.a.x - this.b.x), 2) + Math.pow((this.a.y - this.b.y), 2));

  this.hankin = function(alpha) {
    let mid = this.a.plus(this.b).multiply(.5); // middle between vertices
    let v1 = this.a.subtract(mid); // (this.a - mid) is a vector from second point to first
    let v2 = this.b.subtract(mid);
    let halfLength = v1.length;
    let offset1 = mid;
    let offset2 = mid;

    if (delta > 0) {
      if (delta > this.length / 2) delta = this.length / 2;
      v1 = v1.setMagnitude(Math.abs(delta));
      v2 = v2.setMagnitude(Math.abs(delta));
      offset1 = mid.plus(v2);
      offset2 = mid.plus(v1);
    }

    v1 = v1.setMagnitude(1); // normalize vectors
    v2 = v2.setMagnitude(1);

    angleRad = angle * Math.PI / 180;

    v1 = v1.rotate(-angleRad);
    v2 = v2.rotate(angleRad);

    alpha = alpha / 2;
    let beta = Math.PI - alpha - angleRad;
    let len = Math.sin(alpha) * ((halfLength + delta) / Math.sin(beta));

    v1 = v1.setMagnitude(len);
    v2 = v2.setMagnitude(len);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);

  }

}
