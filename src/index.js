import * as THREE from 'three'
import * as dat from 'dat.gui'
import {ThreeTurtle, makeStandardPen, interpretCommands} from './turtle'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import '../style.css'

function initWorld() {
  const renderer = new THREE.WebGLRenderer({antialias: true})
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100)
  camera.position.z = 10
  camera.position.y = 0
  scene.add(camera)

  const lightSource = new THREE.PointLight(0xFFFFFF, 1, 100)
  lightSource.position.set(0,0,10)
  scene.add(lightSource)

  renderer.setSize(window.innerWidth, window.innerHeight * 0.75)

  const mainDiv = document.createElement('div')
  document.body.appendChild(mainDiv)
  mainDiv.appendChild(renderer.domElement)
  mainDiv.appendChild(document.createElement('textarea'))

  window.addEventListener('resize', ()=> {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  return {renderer, camera, scene, lightSource}
}

const gui = new dat.GUI()

gui.addFolder('Gitterlinien')
gui.addFolder('Kamera')
gui.addFolder('Beispiele')

const world = initWorld()
const orbControls = new OrbitControls(world.camera, world.renderer.domElement)
world.camera.position.y = 3
orbControls.update()


const grid = new THREE.GridHelper(10,10)
world.scene.add(grid)


const render = function() {
  requestAnimationFrame(render)
  orbControls.update()
  world.renderer.render(world.scene, world.camera)
}

const turtle = new ThreeTurtle(makeStandardPen(world.scene))

render()

function toTree(length) {
  if(length > .2) {
    turtle.forward(length)
    turtle.pushState()
    turtle.left(45)
    turtle.roll(45)
    toTree(length * .8)
    turtle.popState()
    turtle.right(45)
    turtle.roll(45)
    toTree(length * .7)
  }
}

toTree(2)