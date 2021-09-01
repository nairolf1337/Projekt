import * as THREE from 'three'
import { MathUtils } from 'three'

//Winkel im Bogenmaß, zuvor Winkel auch im Argument verändert

/**
 * Rotiert einen Vektor um eine Achse
 * @param {*} vector 
 * @param {*} axis 
 * @param {*} rotationAngle Winkel im Bogenmaß
 * @returns 
 */
function rotateVector(vector, axis, rotationAngle) {
  let cosineRotationAngle = Math.cos(rotationAngle)
  let sineRotationAngle = Math.sin(rotationAngle)

  let returnVector = vector.clone()

  //vector * cos rotationAngle + ...
  returnVector.multiplyScalar(cosineRotationAngle).
  // axis x vector * sin rotationAngle +...
               add(axis.clone().cross(vector).multiplyScalar(sineRotationAngle)).
  //axis*(axis.vector)*(1-cos theta)
               add(axis.clone().multiplyScalar(axis.dot(vector)).multiplyScalar(1-cosineRotationAngle))
  
  return returnVector
}

//Problem: Das momentane Design der Klasse ThreeTurtle erlaubt keine parallele Bearbeitung der einzelnen Zweige einer Gabelung. Es existiert lediglich ein Turtle-Objekt für die gesamte Laufzeit
//des Programms. Erweiterung zu asynchroner Abarbeitung?
class ThreeTurtle {
  constructor(pen, {position = new THREE.Vector3(0,0,0), rotationVector = new THREE.Vector3(Math.cos(THREE.MathUtils.degToRad(90)),Math.sin(THREE.MathUtils.degToRad(90)),0),
                    rollVector = new THREE.Vector3(0,0,1), penDown = true} = {}) {
    this.position = position
    this.rotationVector = rotationVector
    this.rollVector = rollVector
    this.pen = pen
    this.penDown = penDown
    this.previous = undefined
    this.stack = []
  }

  forward(length) {
    this.previous = this.position.clone()
    this.position.add(this.rotationVector.clone().multiplyScalar(length))

    console.log('previous: ',this.previous)
    console.log('position: ',this.position)

    if(this.penDown) {
      console.log('penDown: ',this.penDown)
      this.pen(this.previous, this.position, undefined)
    }
  }

  rotate(degrees) {
    console.log('rot. vector: ', this.rotationVector)
    console.log('roll. vector: ', this.rollVector)
    this.rotationVector = rotateVector(this.rotationVector, this.rollVector, THREE.MathUtils.degToRad(degrees))
    console.log('rot. vec. after rotation: ', this.rotationVector)
  }

  left(degrees) {
    this.rotate(degrees)
  }

  right(degrees) {
    this.rotate(360-degrees)
  }

  roll(degrees) {
    this.rollVector = rotateVector(this.rollVector, this.rotationVector, THREE.MathUtils.degToRad(degrees))
  }

  //Problem: Kopieren und call-by-reference
  pushState() {
    //vorher:
    //this.stack.push({position: this.position, ...})
    this.stack.push({position: this.position.clone(), previous: this.previous.clone(), rotationVector: this.rotationVector.clone(), rollVector: this.rollVector.clone()})
  }

  popState() {
    let {position, previous, rotationVector, rollVector} = this.stack.pop()

    this.position = position
    this.previous = previous
    this.rotationVector = rotationVector
    this.rollVector = rollVector
  }
}

/**
 * 
 * @param {*} pen 
 * @param {{rhs: String, args: number[]}[]} lSysState 
 * @param {*} environment 
 */
function interpretCommands(pen, lSysState, environment={}) {
  const turtle = new ThreeTurtle(pen)
  const commands = {'F': turtle.forward,
                    '[': turtle.pushState,
                    ']': turtle.popState,
                    '+': turtle.right,
                    '-': turtle.left,
                    '/': turtle.roll}
  
  lSysState.forEach(({rhs, args})=>{
    if(rhs in commands)
      commands[rhs](args) //Befehl ausführen
  })
}

class TurtleGraphicsInterpreter {
  constructor(pen, environment={}) {
    this.pen = pen
    this.environment = environment
  }
}

export default ThreeTurtle