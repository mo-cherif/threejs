import * as THREE from 'three'
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// creating a scene
const scene = new THREE.Scene();

// creating a sphere
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
})

// sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// mesh combination of geometry and material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0,10,10)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
camera.position.z = 20;
scene.add(camera)



// rendering the scene on the screen
const canvas = document.querySelector('.webgl')
const renderee = new THREE.WebGLRenderer({canvas})

renderee.setSize(sizes.width,sizes.height);
renderee.render(scene, camera)

// controls
const controls = new OrbitControls(camera, canvas)

// Resize

window.addEventListener('resize', ()=> {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight
  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderee.setSize(sizes.width, sizes.height)
})


const loop = () => {
  renderee.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()
