import * as THREE from 'three';

// Winkel im Bogenmaß, zuvor Winkel auch im Argument verändert

/**
 * Rotiert einen Vektor um eine Achse
 * @param {*} vector
 * @param {*} axis
 * @param {*} rotationAngle Winkel im Bogenmaß
 * @returns
 */
function rotateVector(vector, axis, rotationAngle) {
  const cosineRotationAngle = Math.cos(rotationAngle);
  const sineRotationAngle = Math.sin(rotationAngle);

  const returnVector = vector.clone();

  // vector * cos rotationAngle + ...
  returnVector.multiplyScalar(cosineRotationAngle)
    // axis x vector * sin rotationAngle +...
    .add(axis.clone().cross(vector).multiplyScalar(sineRotationAngle))
    // axis*(axis.vector)*(1-cos theta)
    .add(axis.clone().multiplyScalar(axis.dot(vector)).multiplyScalar(1 - cosineRotationAngle));

  return returnVector;
}

// Problem: Das momentane Design der Klasse ThreeTurtle erlaubt keine parallele Bearbeitung
// der einzelnen Zweige einer Gabelung.Es existiert lediglich ein Turtle-Objekt für die
// gesamte Laufzeit des Programms. Erweiterung zu asynchroner Abarbeitung?
class ThreeTurtle {
  constructor(pen, {
    position = new THREE.Vector3(0, 0, 0),
    rotationVector = new THREE.Vector3(Math.cos(THREE.MathUtils.degToRad(90)),
      Math.sin(THREE.MathUtils.degToRad(90)), 0),
    rollVector = new THREE.Vector3(0, 0, 1), penDown = true,
  } = {}) {
    this.position = position;
    this.rotationVector = rotationVector;
    this.rollVector = rollVector;
    this.pen = pen;
    this.penDown = penDown;
    this.previous = this.position;
    this.stack = [];
  }

  forward(length) {
    this.previous = this.position.clone();
    this.position.add(this.rotationVector.clone().multiplyScalar(length[0]));

    if (this.penDown) {
      this.pen(this.previous, this.position, undefined);
    }
  }

  rotate(degrees) {
    this.rotationVector = rotateVector(this.rotationVector,
      this.rollVector, THREE.MathUtils.degToRad(degrees));
  }

  left(degrees) {
    this.rotate(degrees);
  }

  right(degrees) {
    this.rotate(360 - degrees);
  }

  roll(degrees) {
    this.rollVector = rotateVector(this.rollVector, this.rotationVector,
      THREE.MathUtils.degToRad(degrees));
  }

  // Problem: Kopieren und call-by-reference
  pushState() {
    // vorher:
    // this.stack.push({position: this.position, ...})
    this.stack.push({
      position: this.position.clone(),
      previous: this.previous.clone(),
      rotationVector: this.rotationVector.clone(),
      rollVector: this.rollVector.clone(),
    });
  }

  popState() {
    const {
      position, previous, rotationVector, rollVector,
    } = this.stack.pop();

    this.position = position;
    this.previous = previous;
    this.rotationVector = rotationVector;
    this.rollVector = rollVector;
  }
}

/**
 *
 * @param {*} pen
 * @param {{rhs: String, args: number[]}[]} lSysState
 * @param {*} environment
 */
function interpretCommands(pen, lSysState, environment = {}) {
  const turtle = new ThreeTurtle(pen);

  lSysState.forEach(({ lhs, args }) => {
    if (lhs === 'F') { turtle.forward(args); } else if (lhs === '[') { turtle.pushState(); } else if (lhs === ']') { turtle.popState(); } else if (lhs === '+') { turtle.right(args); } else if (lhs === '-') { turtle.left(args); } else if (lhs === '/') { turtle.roll(args); } else if (lhs === '\\') { turtle.roll(360 - args); }
  });
}

function makeStandardPen(scene) {
  return (origin, destination, penColor = 0xFFFFFF) => {
    const material = new THREE.LineBasicMaterial({ color: penColor });
    const points = [origin, destination];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const newLine = new THREE.Line(geometry, material);

    scene.add(newLine);
  };
}

export { ThreeTurtle, interpretCommands, makeStandardPen };
