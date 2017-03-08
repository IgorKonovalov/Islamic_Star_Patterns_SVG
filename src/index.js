// SVG

const width = '700';
const height = '500';

const container = document.getElementById('svgContainer');
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttributeNS(null, "width", width + "px");
svg.setAttributeNS(null, "height", height + "px");
svg.setAttributeNS(null, "id", "starPattern");

// filter!

const defs = document.createElementNS(svgNS, 'defs');
const filter = document.createElementNS(svgNS, 'filter');
filter.setAttribute("id","f1");

const blur = document.createElementNS(svgNS, 'feGaussianBlur');
blur.setAttribute('stdDeviation', '1');

filter.appendChild(blur);
svg.appendChild(filter);




const deltaR = document.getElementById('delta');
const angleR = document.getElementById('angle');
const deltaRInc = document.getElementById('deltaInc');
const angleRInc = document.getElementById('angleInc');
const selectTiling = document.getElementById('tiling');
const elementArray = [deltaR, angleR, deltaRInc, angleRInc];


let angle, delta;


// задание начальных состояний

let polygons = [];

function squareTiling() {
  let inc = 100;
  for (let x = 0; x < width; x += inc) {
    for (let y = 0; y < height; y += inc) {
      let poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polygons.push(poly);
    }
  }
}

squareTiling();

function hexTiling() {
  var hexTiles = new HexagonalTiling(60);
  hexTiles.buildGrid();
  polygons = hexTiles.polys;
}

// hexTiling();

elementArray.forEach((elem)=> {
  elem.addEventListener('mousemove', () => {
    drawSVGhankins();
  })
})

elementArray.forEach((elem)=> {
  elem.addEventListener('touchmove', () => {
    drawSVGhankins();
  })
})


selectTiling.addEventListener('change', () => {
  let elements = [];
  if (selectTiling.value == "square") squareTiling();
  else if (selectTiling.value == "hex") hexTiling();
  elements = Array.prototype.slice.call(svg.childNodes);
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
  drawSVGGrid();
  drawSVGhankins();
})



function drawSVGGrid() { // creating grid with polygons and lines
  polygons.forEach((poly) => {
    const g = document.createElementNS(svgNS, 'g'); // container for SVG polygon and line
    g.setAttribute('class', 'tile');
    const cell = document.createElementNS(svgNS, 'polygon');
    cell.setAttribute('points', poly.getPolygonPoints());
    g.appendChild(cell);
    for (let i = 0; i < poly.edges.length * 2 ; i ++) {
      const line = document.createElementNS(svgNS, 'line');
      g.appendChild(line)
    }
    svg.appendChild(g);
  });
  container.appendChild(svg);
}


drawSVGGrid();


function drawSVGhankins() {
  let deltainc = 0;
  let angleinc = 0;
  polygons.forEach((poly, i) => {
    delta = Number(deltaR.value) + deltainc;
    angle = Number(angleR.value) + angleinc;
    const g = document.getElementsByTagName('g')[i];
    const lines = Array.prototype.slice.call(g.childNodes).slice(1);
    let hankinsCoord = poly.getHankins();
    let count = 4;
    for (let i = 0; i < lines.length ; i++) {
      lines[i].setAttribute('x1', hankinsCoord[count-4]);
      lines[i].setAttribute('y1', hankinsCoord[count-3]);
      lines[i].setAttribute('x2', hankinsCoord[count-2]);
      lines[i].setAttribute('y2', hankinsCoord[count-1]);
      count +=4
    }
    deltainc += Number(deltaRInc.value);
    angleinc += Number(angleRInc.value);
  });
}

drawSVGhankins();
