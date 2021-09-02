import * as THREE from 'three'
import * as dat from 'dat.gui'
import {ThreeTurtle, makeStandardPen, interpretCommands} from './turtle'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import '../style.css'
import { LSystem } from './lSysRep'

const parseFunc = require('./lSysParser.js').parse


const lSysExamples = {
  leer: "",
  eins: "G(3);\nG(n)->[+(30)F(n/2)G(n/2)][-(30)F(n/2)G(n/2)]/(90)[+(45)F(n/2)G(n/2)][-(45)F(n/2)G(n/2)]",
  zwei: "F(2);\nF(n)->F(n)[+(45)F(n*0.75)][/(120)+(45)F(n*0.75)][/(240)-(45)F(n*0.75)]",
  drei: "F(1);\nF(n)->F(n*0.5)[+(25)F(n*0.5)]F(n*0.5)[-(25)F(n*0.5)]F(n*0.5)",
  dreieck: "F(6)+(120)F(6)+(120)F(6);\nF(n)->F(n/2)-(120)F(n/2)+(120)F(n/2)"
}

/**
 * Initialisierung ThreeJS bzw. Oberfläche
 * @returns {Object}
 */
function initWorld() {
  const renderer = new THREE.WebGLRenderer({antialias: true})
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100)
  camera.position.z = 10
  camera.position.y = 5
  scene.add(camera)

  const lightSource = new THREE.PointLight(0xFFFFFF, 1, 100)
  lightSource.position.set(0,0,10)
  scene.add(lightSource)

  renderer.setSize(window.innerWidth, window.innerHeight * 0.75)

  const mainDiv = document.createElement('div')
  document.body.appendChild(mainDiv)
  mainDiv.appendChild(renderer.domElement)
  const textArea = document.createElement('textarea')
  mainDiv.appendChild(textArea)

  window.addEventListener('resize', ()=> {
    renderer.setSize(window.innerWidth, window.innerHeight * 0.75)
    camera.aspect = (window.innerWidth / (window.innerHeight * 0.75))
    camera.updateProjectionMatrix()
  })

  const gridHelper = new THREE.GridHelper(10,10)
  scene.add(gridHelper)
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
  const orbControls = new OrbitControls(camera, renderer.domElement)
  orbControls.update()

  return {renderer, camera, scene, lightSource, textArea, gridHelper, axesHelper, orbControls}
}

const gui = new dat.GUI()

const world = initWorld()
const parameters = { iterations: 0, autoRotate: false, gridActive: true, axesActive: true, chosenExample: '', examples: {}}

const settings = gui.addFolder('Parameter')
const camera = gui.addFolder('Kamera')
const grid = gui.addFolder('Gitter')
const examples = gui.addFolder('Beispiele')

settings.add(parameters, 'iterations', 0, 10, 1).name("Iterationen")

camera.add(parameters, 'autoRotate').name("auto Drehen").onChange(() => {
  world.orbControls.autoRotate = !world.orbControls.autoRotate
})

grid.add(parameters, 'gridActive').name("Gitter aktiv").onChange(() => {
  world.gridHelper.visible = !world.gridHelper.visible
})

grid.add(parameters, 'axesActive').name("Achsen aktiv").onChange(() => {
  world.axesHelper.visible = !world.axesHelper.visible
})

gui.add({generate: function() { world.scene.remove.apply(world.scene, world.scene.children);
                                world.scene.add(world.axesHelper)
                                world.scene.add(world.gridHelper)
                                
                                const lSys = parseFunc(world.textArea.value, new LSystem())
                                for(let i = 0; i < parameters.iterations; ++i) lSys.iterate()
                                interpretCommands(makeStandardPen(world.scene), lSys.readableState) }}, 'generate').name("Ausgabe generieren")

examples.add(parameters, 'chosenExample', lSysExamples ).name("Beispiel").onChange(()=> { world.textArea.value = parameters.chosenExample; console.log(parameters.chosenExample) })
//Animationsschleife
const render = function() {
  requestAnimationFrame(render)

  world.orbControls.update()
  world.renderer.render(world.scene, world.camera)
}

render()